import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidQueryParamsException extends HttpException {
  constructor(errors: string[]) {
    const message = `errors: ${errors.join(', ')}`;
    super(message, HttpStatus.BAD_REQUEST);
  }
}
