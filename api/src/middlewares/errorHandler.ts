import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { logger } from '../config/logger';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    errors: [],
  });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  logger.error('Error no controlado', { error: err });
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    errors: [],
  });
}
