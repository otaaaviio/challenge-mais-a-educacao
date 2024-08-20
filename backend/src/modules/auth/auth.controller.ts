import {
  Controller,
  Post,
  Body,
  Logger,
  Headers,
  Res,
  Req,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginSchema, registerSchema } from '../../schemas/login.schema';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  private setCookie(res, token: string) {
    return res.cookie('authToken', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      secure: false,
      httpOnly: true,
    });
  }

  @Post('/login')
  async login(
    @Body() body,
    @Headers('x-real-ip') ip: string,
    @Headers('user-agent') userAgent: string,
    @Res() res,
  ) {
    try {
      const validatedBody = loginSchema.parse(body);
      const { token, user } = await this.authService.validate(
        validatedBody,
        ip,
        userAgent,
      );
      this.setCookie(res, token);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Successfully logged in', user });
    } catch (err) {
      this.logger.error(`Failed to login:\n ${err}`);
      throw err;
    }
  }

  @Post('/register')
  async register(
    @Body() body,
    @Headers('x-real-ip') ip: string,
    @Headers('user-agent') userAgent: string,
    @Res() res,
  ) {
    try {
      const validatedBody = registerSchema.parse(body);
      const { token, user } = await this.authService.register(
        validatedBody,
        ip,
        userAgent,
      );
      this.setCookie(res, token);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'Successfully registered', user });
    } catch (err) {
      this.logger.error(`Failed to login:\n ${err}`);
      throw err;
    }
  }

  @Get('/logout')
  async logout(@Req() req, @Res() res) {
    try {
      await this.authService.logout(req.cookies?.['authToken']);
      res.clearCookie('authToken', {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: true,
        httpOnly: true,
      });
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Logged out successfully' });
    } catch (err) {
      this.logger.error(`Failed to logout:\n ${err}`);
      throw err;
    }
  }
}
