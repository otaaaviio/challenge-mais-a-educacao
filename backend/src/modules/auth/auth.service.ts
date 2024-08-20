import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  AuthException,
  AuthExceptionType,
} from '../../exceptions/auth.exception';
import { LoginRequest, RegisterRequest } from '../../schemas/login.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkCredentials(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user)
      throw new AuthException(
        AuthExceptionType.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched)
      throw new AuthException(AuthExceptionType.INVALID_CREDENTIALS);

    return user;
  }

  private async authenticateUser(user, ip: string, userAgent: string) {
    await this.prisma.session.updateMany({
      where: {
        userId: user.id,
        active: true,
      },
      data: {
        active: false,
      },
    });

    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        ip,
        userAgent,
      },
    });

    return {
      sessionId: session.id,
      userId: user.id,
    };
  }

  public async validate(body: LoginRequest, ip: string, userAgent: string) {
    const user = await this.checkCredentials(body.email, body.password);

    const payload = await this.authenticateUser(user, ip, userAgent);

    const token = this.jwtService.sign(payload);

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return { token, user: userPayload };
  }

  public async register(body: RegisterRequest, ip: string, userAgent: string) {
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const payload = await this.authenticateUser(user, ip, userAgent);

    const token = this.jwtService.sign(payload);

    const userPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return { token, user: userPayload };
  }

  public async logout(token?: string) {
    if (!token) throw new AuthException(AuthExceptionType.INVALID_TOKEN);

    const payload = this.jwtService.verify(token);

    await this.prisma.session.updateMany({
      where: {
        userId: payload.userId,
        active: true,
      },
      data: {
        active: false,
      },
    });
  }
}
