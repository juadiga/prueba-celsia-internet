import { Request, Response } from 'express';
import { SERVICIOS, TIPOS_IDENTIFICACION } from '../constants/catalogos';

export function getTiposIdentificacion(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    message: 'OK',
    errors: [],
    data: TIPOS_IDENTIFICACION,
  });
}

export function getServicios(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    message: 'OK',
    errors: [],
    data: SERVICIOS,
  });
}
