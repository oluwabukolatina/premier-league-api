import { ENVIRONMENT } from './secrets';

const env = require('./env')[String(ENVIRONMENT)];

const { database, appUrl } = env;

const EnvHelper = {
  getAppUrl() {
    return appUrl;
  },
  getDatabase() {
    return database;
  },
};
export default EnvHelper;
