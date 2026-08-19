import { Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { logger } from '../config/logger';
import { asyncHandler } from '../middlewares/asyncHandler';
import { errorResponse, successResponse } from '../factories/apiResponse.factory';

export const healthRouter = Router();

const DB_TIMEOUT_MS = 2000;

/**
 * Verifica que la base de datos responda. El timeout evita que el healthcheck
 * quede colgado cuando MySQL acepta la conexión pero no contesta.
 */
async function isDatabaseUp(): Promise<boolean> {
  let timer: NodeJS.Timeout | undefined;

  try {
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('Timeout consultando la base de datos')), DB_TIMEOUT_MS);
    });

    await Promise.race([AppDataSource.query('SELECT 1'), timeout]);
    return true;
  } catch (error) {
    logger.error('Healthcheck: la base de datos no responde', { error });
    return false;
  } finally {
    clearTimeout(timer);
  }
}

healthRouter.get(
  '/health',
  asyncHandler(async (_req, res) => {
    const databaseUp = await isDatabaseUp();

    if (!databaseUp) {
      res.status(503).json(errorResponse('Servicio no disponible: la base de datos no responde'));
      return;
    }

    res.status(200).json(
      successResponse({
        status: 'up',
        database: 'up',
        timestamp: new Date().toISOString(),
      }),
    );
  }),
);
