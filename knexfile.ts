import type { Knex } from 'knex'

// Update with your config settings.

import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env

const config: Record<string, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      database: DB_DATABASE,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD
    },
    /* external connection */
    // connection: 'postgres://mlaxxpue:BWTGY_tresN4DsOFxmTh8KltNWaYc71Q@rain.db.elephantsql.com/mlaxxpue',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: '/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      database: DB_DATABASE,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD
    },
    // connection: 'postgres://mlaxxpue:BWTGY_tresN4DsOFxmTh8KltNWaYc71Q@rain.db.elephantsql.com/mlaxxpue',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: '/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: DB_HOST,
      database: DB_DATABASE,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD
    },
    // connection: 'postgres://mlaxxpue:BWTGY_tresN4DsOFxmTh8KltNWaYc71Q@rain.db.elephantsql.com/mlaxxpue',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: '/migrations'
    }
  }

}

module.exports = config
