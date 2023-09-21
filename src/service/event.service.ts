/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Knex } from 'knex'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import { createEventModel, deleteEventModel, getEventModel, updateEventModel } from '../model/event.model'

export const getEventService = async (
  page: number,
  limit: number
): Promise<any> =>
  await withTransaction(
    knex,
    async (trx: Knex) => await getEventModel(trx, page, limit)
  )

export const CreateEventService = async (
  body: any
): Promise<any> => {
  return await withTransaction(
    knex,
    async (trx: Knex) => await createEventModel(body, trx)
  )
}

export const updateEventService = async (
  id: string,
  body: any
): Promise<any> => {
  return await withTransaction(knex, async (trx: Knex) => await updateEventModel(id, body, trx))
}

export const deleteEventService = async (id: string): Promise<any> =>
  await withTransaction(
    knex,
    async (trx: Knex) => await deleteEventModel(id, trx)
  )
