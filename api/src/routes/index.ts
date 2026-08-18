import { Router } from 'express';
import { catalogosRouter } from './catalogos.routes';
import { healthRouter } from './health.routes';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(catalogosRouter);
