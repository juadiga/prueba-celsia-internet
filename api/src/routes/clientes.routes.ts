import { Router } from 'express';
import {
  createCliente,
  deleteCliente,
  getCliente,
  listClientes,
  updateCliente,
} from '../controllers/clientes.controller';
import { validate } from '../middlewares/validate';
import { validateCreateClienteDto } from '../dtos/CreateClienteDto';
import { validateUpdateClienteDto } from '../dtos/UpdateClienteDto';

export const clientesRouter = Router();

clientesRouter.get('/clientes', listClientes);
clientesRouter.get('/clientes/:identificacion', getCliente);
clientesRouter.post('/clientes', validate(validateCreateClienteDto), createCliente);
clientesRouter.put('/clientes/:identificacion', validate(validateUpdateClienteDto), updateCliente);
clientesRouter.delete('/clientes/:identificacion', deleteCliente);
