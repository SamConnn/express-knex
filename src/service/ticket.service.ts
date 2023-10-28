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

export const getTicketService = async (
  page: number,
  limit: number
): Promise<any> =>
  await withTransaction(
    knex,
    async () => await getTicketModel(page, limit)
  )

export const getListofTicketByUserService = async (
  page: number,
  limit: number,
  userID: string
): Promise<any> => {
  return await withTransaction(
    knex,
    async () => await getListTicketOfEvent(userID, page, limit)
  )
}

export const CreateTicketService = async (
  res: any,
  body: any
): Promise<any> => {
  await withTransaction(knex, async (trx: Knex) => {
    await createTicketModel(body).then((result) => {
      return trx('ticket').where({ id: result[0].ticket_id }).update({
        user_id: res.locals.user.id,
        created_at: knex.fn.now()
      })
    })
  })
}

export const updateTicketService = async (
  id: string,
  body: any
): Promise<any> => {
  return await withTransaction(
    knex,
    async () => await updateTicketModel(id, body)
  )
}

export const deleteTicketService = async (id: string): Promise<any> =>
  await withTransaction(
    knex,
    async () => await deleteTicketModel(id)
  )
