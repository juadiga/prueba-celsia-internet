import { Router } from 'express';
import { catalogosRouter } from './catalogos.routes';
import { clientesRouter } from './clientes.routes';
import { healthRouter } from './health.routes';
import { serviciosRouter } from './servicios.routes';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(catalogosRouter);
apiRouter.use(clientesRouter);
apiRouter.use(serviciosRouter);
