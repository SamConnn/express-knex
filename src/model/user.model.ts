/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Knex, knex } from 'knex'

const table = 'user'

const userFields = [
  'user.id',
  'user.username',
  'user.email',
  'user.role'
]

export const getUserModel = async (
  page: number,
  limit: number
): Promise<any> => await knex(table)
  .select(userFields)
  .paginate({ perPage: limit, currentPage: page, isLengthAware: true })

export const createUserModel = async (body: any, trx: Knex) => await trx(table).insert(body).returning('id')

export const getUserByIdModel = async (id: string, trx: Knex) => await trx(table)
  .select(userFields)
  .where({ id })
  .first()

export const updateUserModel = async (id: string, body: any, trx: Knex) => await trx(table).update(body).where({ id }).returning('id')

export const deleteUserModel = async (id: string, trx: Knex) => await trx(table).del().where({ id }).returning('id')

export const findUserByEmail = async (email: string) => await knex(table).select('*').where({ email })
