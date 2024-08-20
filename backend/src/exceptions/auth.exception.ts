import { HttpException, HttpStatus } from '@nestjs/common';

export enum AuthExceptionType {
  INVALID_TOKEN = 'Invalid Token.',
  NO_TOKEN = 'No token provided.',
  INVALID_CREDENTIALS = 'Invalid credentials.',
  USER_NOT_FOUND = 'User not found.',
}

export class AuthException extends HttpException {
  constructor(
    message: AuthExceptionType,
    status: HttpStatus = HttpStatus.UNAUTHORIZED,
  ) {
    super(message, status);
  }
}
