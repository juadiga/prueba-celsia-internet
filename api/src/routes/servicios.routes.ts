import { Router } from 'express';
import { createServicio, deleteServicio, listServicios, updateServicio } from '../controllers/servicios.controller';
import { validate } from '../middlewares/validate';
import { validateCreateServicioDto } from '../dtos/CreateServicioDto';
import { validateUpdateServicioDto } from '../dtos/UpdateServicioDto';

export const serviciosRouter = Router();

serviciosRouter.get('/servicios', listServicios);
serviciosRouter.post('/servicios', validate(validateCreateServicioDto), createServicio);
serviciosRouter.put(
  '/servicios/:identificacion/:servicio',
  validate(validateUpdateServicioDto),
  updateServicio,
);
serviciosRouter.delete('/servicios/:identificacion/:servicio', deleteServicio);
