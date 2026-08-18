import { Request, Response } from 'express';
import { SERVICIOS, TIPOS_IDENTIFICACION } from '../constants/catalogos';
import { successResponse } from '../factories/apiResponse.factory';

export function getTiposIdentificacion(_req: Request, res: Response): void {
  res.status(200).json(successResponse(TIPOS_IDENTIFICACION));
}

export function getServicios(_req: Request, res: Response): void {
  res.status(200).json(successResponse(SERVICIOS));
}
