import { ZodError, ZodIssue } from 'zod';

export const zodErrorParser = (err: ZodError) => {
  return {
    message: 'Validation error',
    errors: err.errors.map((e: ZodIssue) => ({
      code: e.code,
      field: e.path.join('.'),
      message: e.message,
    })),
  };
};
