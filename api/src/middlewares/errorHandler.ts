import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { errorResponse } from '../factories/apiResponse.factory';
import { logger } from '../config/logger';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json(errorResponse(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(errorResponse(err.message, err.errors));
    return;
  }

  logger.error('Error no controlado', { error: err });
  res.status(500).json(errorResponse('Error interno del servidor'));
}
