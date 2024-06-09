module.exports = {
  development: {
    appUrl: process.env.GO_MONEY_DEV_APP_URL,
    database: process.env.GO_MONEY_DATABASE_DEV_URL,
  },
  production: {
    appUrl: process.env.GO_MONEY_APP_URL,
    database: process.env.GO_MONEY_DATABASE_URL,
  },
  test: {
    appUrl: process.env.GO_MONEY_DEV_APP_URL,
    database: process.env.GO_MONEY_DATABASE_TEST_URL,
  },
};
