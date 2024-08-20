import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  NotFoundException,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';
import { zodErrorParser } from '../utils/zod-parser';
import { Prisma } from '@prisma/client';

@Catch()
export class ErrorHandlerMiddleware implements ExceptionFilter {
  private readonly logger = new Logger(ErrorHandlerMiddleware.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message = 'An error occurred';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof ZodError) {
      const parsedValidationError = zodErrorParser(exception as ZodError);
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json(parsedValidationError);
    }

    if (exception instanceof TypeError)
      this.logger.error(exception.message, exception.stack);

    if (exception instanceof HttpException)
      return response
        .status(exception.getStatus())
        .json({ error: exception.message });

    if (exception instanceof NotFoundException) {
      statusCode = HttpStatus.NOT_FOUND;
      message = 'Resource not found';
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2003':
          message = 'Student with these credentials already exists';
          statusCode = HttpStatus.BAD_REQUEST;
          break;
        case 'P2002':
          message = `Unique constraint failed on the fields: ${(exception.meta.target as string[]).join(', ')}`;
          statusCode = HttpStatus.BAD_REQUEST;
          break;
        case 'P2010':
          message = 'Student not found';
          statusCode = HttpStatus.NOT_FOUND;
          break;
      }
    }

    response.status(statusCode).json({
      code: statusCode,
      message: message,
    });
  }
}
