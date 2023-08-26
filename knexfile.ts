import type { Knex } from "knex";

// Update with your config settings.

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user:   DB_USER,
      password: DB_PASS,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "./migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user:   DB_USER,
      password: DB_PASS,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "./migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user:   DB_USER,
      password: DB_PASS,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "./migrations"
    }
  }

};

module.exports = config;
