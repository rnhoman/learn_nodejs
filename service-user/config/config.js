require("dotenv").config();

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_CONNECTION,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_CONNECTION,
    timezone: "Asia/Jakarta"
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_CONNECTION,
    timezone: "Asia/Jakarta"
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOSTNAME,
    dialect: DB_CONNECTION,
    timezone: "Asia/Jakarta"
  },
};
