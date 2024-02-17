/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Knex } from 'knex'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import { createEventModel, deleteEventModel, getEventModel, updateEventModel } from '../model/event.model'

export const search = async (
  page: number,
  limit: number
): Promise<any> => await getEventModel(page, limit)

export const create = async (
  body: any
): Promise<any> => await withTransaction(knex, async (trx: Knex) => await createEventModel(body, trx))

export const update = async (
  id: string,
  body: any
): Promise<any> => await withTransaction(knex, async (trx: Knex) => await updateEventModel(id, body, trx))

export const destroy = async (id: string): Promise<any> =>
  await withTransaction(knex, async (trx: Knex) => await deleteEventModel(id, trx))
