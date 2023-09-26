/* eslint-disable @typescript-eslint/explicit-function-return-type */
import knex from '../config/knex'

const trx = knex
const table = 'ticket'

export const getTicketModel = async (
  page: number,
  limit: number
): Promise<any> =>
  await trx(table)
    .select(
      'ticket.id',
      'ticket.name',
      'ticket.description',
      'ticket.price',
      'ticket.quantity',
      'ticket.created_at',
      'ticket.updated_at'
    )
    .paginate({ perPage: limit, currentPage: page, isLengthAware: true })

export const getListTicket = async (userID: string) =>
  await trx(table)
    .select(
      'ticket.id',
      'ticket.name as ticket_name',
      'ticket.description as ticket_description',
      'ticket.price as ticket_price',
      'ticket.quantity as ticket_quantity',
      'event.name as event_name',
      'event.description as event_description',
      'event.location as event_location',
      'event.date as event_date',
      'event.time as event_time'
    )
    .join('event_ticket', 'ticket.id', 'event_ticket.ticket_id')
    .join('event', 'event_ticket.event_id', 'event.id')
    .where({ user_id: userID })

export const createTicketModel = async (body: any) =>
  await trx(table)
    .insert(body)
    .returning('id')
    // join with event_ticket tabble and insert event_id and ticket_id
    .then((result) => {
      return trx('event_ticket')
        .insert({
          event_id: body.event_id,
          ticket_id: result[0].id,
          created_at: new Date()
        })
        .returning('ticket_id')
    })

export const getTicketByIdModel = async (id: string) =>
  await trx(table)
    .select(
      'ticket.id',
      'ticket.name',
      'ticket.description',
      'ticket.price',
      'ticket.quantity',
      'ticket.created_at',
      'ticket.updated_at'
    )
    .where({ id })
    .first()

export const updateTicketModel = async (id: string, body: any) =>
  await trx(table).update(body).where({ id }).returning('*')

export const deleteTicketModel = async (id: string) =>
  await trx(table).del().where({ id }).returning('*')

export const getTicketByEventModel = async (ticketId: string) =>
  await trx(table)
    .select(
      'ticket.id',
      'ticket.name as ticket_name',
      'ticket.description as ticket_description',
      'ticket.price as ticket_price',
      'ticket.quantity as ticket_quantity',
      'event.name as event_name',
      'event.description as event_description',
      'event.location as event_location',
      'event.date as event_date',
      'event.time as event_time'
    )
    .join('event_ticket', 'ticket.id', 'event_ticket.ticket_id')
    .join('event', 'event_ticket.event_id', 'event.id')
    .where('ticket.id', ticketId)
