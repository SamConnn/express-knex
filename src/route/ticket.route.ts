/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import ticketController from '../controller/ticket.controller'
import { validateRequest } from '../middleware/validate'
import { loopRoute } from '../utils/route'
import { ticketSchema } from '../utils/validator'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/event/:ticketID', middleware: [], controller: ticketController.getTicketByEvent },
  { method: 'get', path: '/user-ticket', middleware: [], controller: ticketController.getListOfTicketUser },
  { method: 'get', path: '/', middleware: [], controller: ticketController.getTicket },
  { method: 'get', path: '/:id', middleware: [], controller: ticketController.findTicketById },
  { method: 'post', path: '/', middleware: [validateRequest(ticketSchema)], controller: ticketController.createTicket },
  { method: 'put', path: '/:id', middleware: [validateRequest(ticketSchema)], controller: ticketController.updateTicket },
  { method: 'delete', path: '/:id', middleware: [], controller: ticketController.deleteTicket }
]

loopRoute(routes, route)

export default route
