require('dotenv').config();

const environment = process.env.NODE_ENV || 'test';

const suffix = {
  dev: '_dev',
  development: '_dev',
  test: '_test',
  production: '',
};

const options = {
  host: process.env.HOSTNAME || process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  database: `${process.env.DB_NAME || 'trading_app'}${
    suffix[environment] || suffix.test
  }`,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  dialect: process.env.DB_DIALECT || 'mysql',
  // dialectOptions: {
  // timezone: 'Z',
  // },
  timezone: '-03:00',
  logging: process.env.DEBUG !== 'false',
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
