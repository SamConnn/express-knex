/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import ticketController from '../controller/ticket.controller'
import { validate } from '../middleware/validate'
import { ticketSchema } from '../utils/validator'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/event/:ticketID', middleware: [], controller: ticketController.getTicketByEvent },
  { method: 'get', path: '/ticket-list', middleware: [], controller: ticketController.getListOfTicketByUser },
  { method: 'get', path: '/', middleware: [], controller: ticketController.getTicket },
  { method: 'get', path: '/:id', middleware: [], controller: ticketController.findTicketById },
  { method: 'post', path: '/', middleware: [validate(ticketSchema)], controller: ticketController.createTicket },
  { method: 'put', path: '/:id', middleware: [validate(ticketSchema)], controller: ticketController.updateTicket },
  { method: 'delete', path: '/:id', middleware: [], controller: ticketController.deleteTicket }
]

routes.forEach(({ method, path, middleware, controller }) => {
  route[method](path, ...middleware, controller)
})

export default route
