/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Knex } from 'knex'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import {
  createTicketModel,
  deleteTicketModel,
  getListTicketOfEvent,
  getTicketModel,
  updateTicketModel
} from '../model/ticket.model'

export const search = async (
  page: number,
  limit: number
): Promise<any> => await getTicketModel(page, limit)

export const getListOfTicketByUser = async (
  page: number,
  limit: number,
  userID: string
): Promise<any> => await getListTicketOfEvent(userID, page, limit)

export const create = async (
  res: any,
  body: any
): Promise<any> => {
  await withTransaction(knex, async (trx: Knex) => await createTicketModel(body).then((result) => {
    return trx('ticket').where({ id: result[0].ticket_id }).update({
      user_id: res.locals.user.id,
      created_at: knex.fn.now()
    })
  }))
}

export const update = async (
  id: string,
  body: any
): Promise<any> => await withTransaction(knex, async () => await updateTicketModel(id, body))

export const destroy = async (
  id: string
): Promise<any> => await withTransaction(knex, async () => await deleteTicketModel(id))
