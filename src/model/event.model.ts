/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Knex } from 'knex'
import knex from '../config/knex'

const table = 'event'

export const getEventModel = async (
  page: number,
  limit: number
): Promise<any> => await knex(table)
  .select('event.id', 'event.name', 'event.description', 'event.date', 'event.location', 'event.image', 'event.created_at', 'event.updated_at')
  .paginate({ perPage: limit, currentPage: page, isLengthAware: true })
  .catch((err: string) => {
    console.error(err)
    throw new Error(err)
  })

export const createEventModel = async (body: any, trx: Knex) => await trx(table).insert(body).returning('id')

export const getEventByIdModel = async (id: string, trx: Knex) => await trx(table)
  .select('event.id', 'event.name', 'event.description', 'event.date', 'event.location', 'event.image', 'event.created_at', 'event.updated_at')
  .where({ id })
  .first()

export const updateEventModel = async (id: string, body: any, trx: Knex) => await trx(table).update(body).where({ id }).returning('id')

export const deleteEventModel = async (id: string, trx: Knex) => await trx(table).del().where({ id }).returning('id')
