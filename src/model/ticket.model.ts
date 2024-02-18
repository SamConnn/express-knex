/* eslint-disable @typescript-eslint/explicit-function-return-type */
import knex from '../config/knex'

const trx = knex
const table = 'ticket'

const ticketFields = [
  'ticket.id',
  'ticket.name',
  'ticket.description',
  'ticket.price',
  'ticket.quantity',
  'ticket.created_at',
  'ticket.updated_at'
]

export const getTicketModel = async (
  page: number,
  limit: number
): Promise<any> =>
  await knex(table)
    .select(ticketFields)
    .paginate({ perPage: limit, currentPage: page, isLengthAware: true })

export const getListTicketOfEvent = async (userID: string, page: number, limit: number) =>
  await knex(table)
    .select(...ticketFields,
      'event.name as eventName',
      'event.description as eventDescription',
      'event.location as eventLocation',
      'event.date as eventDate',
      'event.time as eventTime'
    )
    .join('event_ticket', 'ticket.id', 'event_ticket.ticket_id')
    .join('event', 'event_ticket.event_id', 'event.id')
    .where({ user_id: userID })
    .paginate({ perPage: limit, currentPage: page, isLengthAware: true })

export const createTicketModel = async (body: any) =>
  await trx(table)
    .insert(body)
    .returning('id')
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
  await knex(table)
    .select(ticketFields)
    .where({ id })
    .first()

export const updateTicketModel = async (id: string, body: any) =>
  await trx(table).update(body).where({ id }).returning('*')

export const deleteTicketModel = async (id: string) =>
  await trx(table).del().where({ id }).returning('*')

export const getTicketByEventModel = async (ticketId: string) =>
  await knex(table)
    .select(...ticketFields,
      'event.name as event_name',
      'event.description as event_description',
      'event.location as event_location',
      'event.date as event_date',
      'event.time as event_time'
    )
    .join('event_ticket', 'ticket.id', 'event_ticket.ticket_id')
    .join('event', 'event_ticket.event_id', 'event.id')
    .where('ticket.id', ticketId)
