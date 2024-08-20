import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  private logger = new Logger('HTTP');

  async use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;
    const token = req.cookies ? req.cookies['authToken'] : null;

    let userId = null;
    if (token) userId = (await this.jwtService.verify(token)).userId;

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(
        `[${method}] ${originalUrl} | UserId: ${userId} | Duration: ${duration}ms`,
      );
    });

    next();
  }
}
