import dotenv from 'dotenv';
import fs from 'fs';
import logger from '../lib/logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}
function throwIfUndefined<T>(secret: T | undefined, name?: string): T {
  if (!secret) {
    logger.error(`${name} must not be undefined`);
    return process.exit(1);
  }
  return secret;
}
export const ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');
export const GO_MONEY_JWT_EXPIRY = throwIfUndefined(
  process.env.GO_MONEY_JWT_EXPIRY,
  'GO_MONEY_JWT_EXPIRY',
);
export const GO_MONEY_JWT_SECRET = throwIfUndefined(
  process.env.GO_MONEY_JWT_SECRET,
  'GO_MONEY_JWT_SECRET',
);

throwIfUndefined(
  process.env.GO_MONEY_DATABASE_TEST_URL,
  'GO_MONEY_DATABASE_TEST_URL',
);
throwIfUndefined(process.env.GO_MONEY_DATABASE_URL, 'GO_MONEY_DATABASE_URL');
throwIfUndefined(
  process.env.GO_MONEY_DATABASE_DEV_URL,
  'GO_MONEY_DATABASE_DEV_URL',
);
