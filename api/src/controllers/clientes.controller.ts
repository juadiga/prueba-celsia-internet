import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { toClienteResponseDto } from '../dtos/ClienteResponseDto';
import { CreateClienteDto } from '../dtos/CreateClienteDto';
import { UpdateClienteDto } from '../dtos/UpdateClienteDto';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ClienteService } from '../services/cliente.service';

const clienteService = new ClienteService(new ClienteRepository());

export const listClientes = asyncHandler(async (_req: Request, res: Response) => {
  const clientes = await clienteService.findAll();
  res.status(200).json({
    success: true,
    message: 'OK',
    errors: [],
    data: clientes.map(toClienteResponseDto),
  });
});

export const getCliente = asyncHandler(async (req: Request, res: Response) => {
  const cliente = await clienteService.findByIdentificacion(req.params.identificacion as string);
  res.status(200).json({
    success: true,
    message: 'OK',
    errors: [],
    data: toClienteResponseDto(cliente),
  });
});

export const createCliente = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as CreateClienteDto;
  const cliente = await clienteService.create(dto);
  res.status(201).json({
    success: true,
    message: 'Cliente creado',
    errors: [],
    data: toClienteResponseDto(cliente),
  });
});

export const updateCliente = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as UpdateClienteDto;
  const cliente = await clienteService.update(req.params.identificacion as string, dto);
  res.status(200).json({
    success: true,
    message: 'Cliente actualizado',
    errors: [],
    data: toClienteResponseDto(cliente),
  });
});

export const deleteCliente = asyncHandler(async (req: Request, res: Response) => {
  await clienteService.delete(req.params.identificacion as string);
  res.status(200).json({
    success: true,
    message: 'Cliente eliminado',
    errors: [],
    data: null,
  });
});
