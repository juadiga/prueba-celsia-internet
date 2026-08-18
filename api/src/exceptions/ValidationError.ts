import { AppError } from './AppError';

export class ValidationError extends AppError {
  constructor(errors: string[]) {
    super('Error de validación', 400, errors);
  }
}
