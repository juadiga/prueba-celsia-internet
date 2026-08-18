import { createApp } from './app';
import { AppDataSource } from './config/data-source';
import { env } from './config/env';
import { logger } from './config/logger';

AppDataSource.initialize()
  .then(() => {
    const app = createApp();
    app.listen(env.port, () => {
      logger.info(`API escuchando en el puerto ${env.port} (${env.nodeEnv})`);
    });
  })
  .catch((error: unknown) => {
    logger.error('No fue posible conectar a la base de datos', { error });
    process.exit(1);
  });
