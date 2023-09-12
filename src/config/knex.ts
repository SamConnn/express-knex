import dotenv from 'dotenv'
import 'dotenv/config'
import Knex from 'knex'

import { attachPaginate } from 'knex-paginate'
dotenv.config({ path: './config.env' })
attachPaginate()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = process.env

const knex = Knex({
  client: 'pg',
  connection: {
    host: DB_HOST,
    database: DB_DATABASE,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD
  },
  /* external connection */
  // connection: 'postgres://mlaxxpue:BWTGY_tresN4DsOFxmTh8KltNWaYc71Q@rain.db.elephantsql.com/mlaxxpue',
  searchPath: ['knex', 'public'],
  pool: { min: 0, max: 10 }
})

export const onDataBaseConnected = async (): Promise<string> =>
  await knex.raw('SELECT 1+1 as result')

export default knex
