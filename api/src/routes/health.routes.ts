import { Router } from 'express';
import { successResponse } from '../factories/apiResponse.factory';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  res.status(200).json(successResponse({ status: 'up', timestamp: new Date().toISOString() }));
});
