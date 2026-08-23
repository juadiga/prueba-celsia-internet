import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { toClienteResponseDto } from '../dtos/ClienteResponseDto';
import { toServicioResponseDto } from '../dtos/ServicioResponseDto';
import { CreateClienteDto } from '../dtos/CreateClienteDto';
import { UpdateClienteDto } from '../dtos/UpdateClienteDto';
import { successResponse } from '../factories/apiResponse.factory';
import { ClienteRepository } from '../repositories/cliente.repository';
import { ServicioRepository } from '../repositories/servicio.repository';
import { ClienteService } from '../services/cliente.service';

const clienteRepository = new ClienteRepository();
const servicioRepository = new ServicioRepository();
const clienteService = new ClienteService(clienteRepository, servicioRepository);

export const listClientes = asyncHandler(async (_req: Request, res: Response) => {
  const clientes = await clienteService.findAll();
  res.status(200).json(successResponse(clientes.map(toClienteResponseDto)));
});

export const getCliente = asyncHandler(async (req: Request, res: Response) => {
  const cliente = await clienteService.findByIdentificacion(req.params.identificacion as string);
  res.status(200).json(successResponse(toClienteResponseDto(cliente)));
});

export const createCliente = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as CreateClienteDto;
  const cliente = await clienteService.create(dto);
  res.status(201).json(successResponse(toClienteResponseDto(cliente), 'Cliente creado'));
});

export const updateCliente = asyncHandler(async (req: Request, res: Response) => {
  const dto = req.body as UpdateClienteDto;
  const cliente = await clienteService.update(req.params.identificacion as string, dto);
  res.status(200).json(successResponse(toClienteResponseDto(cliente), 'Cliente actualizado'));
});

export const getClienteConServicios = asyncHandler(async (req: Request, res: Response) => {
  const { cliente, servicios } = await clienteService.findConServicios(
    req.params.identificacion as string,
  );
  res.status(200).json(
    successResponse({
      cliente: toClienteResponseDto(cliente),
      servicios: servicios.map(toServicioResponseDto),
    }),
  );
});

export const deleteCliente = asyncHandler(async (req: Request, res: Response) => {
  await clienteService.delete(req.params.identificacion as string);
  res.status(200).json(successResponse(null, 'Cliente eliminado'));
});
