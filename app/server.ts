import app from './app';
import logger from './lib/logger';
import { connectToDatabase } from './database/database-connection';
import { ENVIRONMENT } from './config/secrets';

const APP_PORT: number = parseInt(process.env.PORT as string, 10) || 8010;

const server = app.listen(APP_PORT, () => {
  logger.info(`Server started at ${APP_PORT}`);
  connectToDatabase()
    .then(async (response) => {
      logger.debug(`${response.connection.name} ----> the name`);
      logger.debug(`${response.connection.host} ----> the host`);
      logger.debug(`${response.connection.user} ----> the user`);
      logger.info(`ENVIRONMENT: ${ENVIRONMENT}`);
    })
    .catch(() => {
      logger.error('Unable to connect to the database');
    });
});
process.on('unhandledRejection', (err, promise) => {
  logger.info(err);
  logger.info(promise);
  server.close(() => process.exit(1));
});
