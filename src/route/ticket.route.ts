/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import ticketController from '../controller/ticket.controller'
import { validateRequest } from '../middleware/validate'
import { ticketSchema } from '../utils/validator'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/event/:ticketID', middleware: [], func: ticketController.getTicketByEvent },
  { method: 'get', path: '/user-ticket', middleware: [], func: ticketController.getListOfTicketUser },
  { method: 'get', path: '/', middleware: [], func: ticketController.getTicket },
  { method: 'get', path: '/:id', middleware: [], func: ticketController.findTicketById },
  { method: 'post', path: '/', middleware: [validateRequest(ticketSchema)], func: ticketController.createTicket },
  { method: 'put', path: '/:id', middleware: [validateRequest(ticketSchema)], func: ticketController.updateTicket },
  { method: 'delete', path: '/:id', middleware: [], func: ticketController.deleteTicket }
]

routes.forEach(({ method, path, middleware, func }) => {
  route[method](path, ...middleware, func)
})

export default route
