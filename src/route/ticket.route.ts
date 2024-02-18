/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  getTicket,
  findTicketById,
  createTicket,
  updateTicket,
  deleteTicket
} from '../controller/ticket.controller'
import { validateRequest } from '../middleware/validate'
import { ticketSchema } from '../utils/validator'
import { type RouteDetails, applyRoutes } from '../utils/route'
import { protect, restrictTo } from '../controller/auth.controller'

const route = express.Router()

route.use(protect, restrictTo('Admin'))

const routes: Record<string, RouteDetails[]> = {
  get: [
    ['/', [], getTicket],
    ['/:id', [], findTicketById]
  ],
  post: [
    ['/', [validateRequest(ticketSchema)], createTicket]
  ],
  put: [
    ['/:id', [validateRequest(ticketSchema)], updateTicket]
  ],
  delete: [
    ['/:id', [], deleteTicket]
  ]
}

applyRoutes(routes, route)

export default route
