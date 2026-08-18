import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { toServicioResponseDto } from '../dtos/ServicioResponseDto';
import { CreateServicioDto } from '../dtos/CreateServicioDto';
import { UpdateServicioDto } from '../dtos/UpdateServicioDto';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ServicioRepository } from '../repositories/servicio.repository';
import { ServicioService } from '../services/servicio.service';

const servicioService = new ServicioService(new ServicioRepository(), new ClienteRepository());

export const listServicios = asyncHandler(async (_req: Request, res: Response) => {
  const servicios = await servicioService.findAll();
  res.status(200).json({
    success: true,
    message: 'OK',
    errors: [],
    data: servicios.map(toServicioResponseDto),
  });
});

export const createServicio = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as CreateServicioDto;
  const servicio = await servicioService.create(dto);
  res.status(201).json({
    success: true,
    message: 'Servicio contratado',
    errors: [],
    data: toServicioResponseDto(servicio),
  });
});

export const updateServicio = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as UpdateServicioDto;
  const servicio = await servicioService.update(
    req.params.identificacion as string,
    req.params.servicio as string,
    dto,
  );
  res.status(200).json({
    success: true,
    message: 'Servicio actualizado',
    errors: [],
    data: toServicioResponseDto(servicio),
  });
});

export const deleteServicio = asyncHandler(async (req: Request, res: Response) => {
  await servicioService.delete(req.params.identificacion as string, req.params.servicio as string);
  res.status(200).json({
    success: true,
    message: 'Servicio eliminado',
    errors: [],
    data: null,
  });
});
