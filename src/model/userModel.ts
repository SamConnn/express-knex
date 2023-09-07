/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Knex } from 'knex'

const table = 'user'

export const getUserModel = async (
  trx: Knex,
  page: number,
  limit: number
): Promise<any> => await trx(table).select('*').paginate({ perPage: limit, currentPage: page })

export const createUserModel = async (body: any, trx: Knex) => await trx(table).insert(body).returning('*')

export const getUserByIdModel = async (id: number, trx: Knex) => await trx(table).select('*').where({ id })

export const updateUserModel = async (id: number, body: any, trx: Knex) => await trx(table).update(body).where({ id }).returning('*')

export const deleteUserModel = async (id: number, trx: Knex) => await trx(table).del().where({ id }).returning('*')
