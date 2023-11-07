/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import ticketController from '../controller/ticket.controller'
import { validate } from '../middleware/validate'
import { ticketSchema } from '../utils/validator'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/event/:ticketID', middleware: [], func: ticketController.getTicketByEvent },
  { method: 'get', path: '/ticket-list', middleware: [], func: ticketController.getListOfTicketUser },
  { method: 'get', path: '/', middleware: [], func: ticketController.getTicket },
  { method: 'get', path: '/:id', middleware: [], func: ticketController.findTicketById },
  { method: 'post', path: '/', middleware: [validate(ticketSchema)], func: ticketController.createTicket },
  { method: 'put', path: '/:id', middleware: [validate(ticketSchema)], func: ticketController.updateTicket },
  { method: 'delete', path: '/:id', middleware: [], func: ticketController.deleteTicket }
]

routes.forEach(({ method, path, middleware, func }) => {
  route[method](path, ...middleware, func)
})

export default route
