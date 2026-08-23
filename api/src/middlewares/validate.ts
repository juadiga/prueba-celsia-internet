import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ValidationError } from '../exceptions/ValidationError';

export function validate(validator: (body: Record<string, unknown>) => string[]): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const errors = validator((req.body ?? {}) as Record<string, unknown>);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    next();
  };
}
