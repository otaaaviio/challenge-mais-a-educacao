import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthException, AuthExceptionType } from '../exceptions/auth.exception';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies ? req.cookies['authToken'] : null;

    if (!token) throw new AuthException(AuthExceptionType.NO_TOKEN);

    try {
      await this.jwtService.verify(token);
    } catch (err) {
      throw new AuthException(AuthExceptionType.INVALID_TOKEN);
    }

    next();
  }
}
