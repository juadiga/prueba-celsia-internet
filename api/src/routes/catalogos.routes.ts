import { Router } from 'express';
import { getServicios, getTiposIdentificacion } from '../controllers/catalogos.controller';

export const catalogosRouter = Router();

catalogosRouter.get('/catalogos/tipos-identificacion', getTiposIdentificacion);
catalogosRouter.get('/catalogos/servicios', getServicios);
