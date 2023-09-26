/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import ticketController from '../controller/ticket.controller'
import { validate } from '../middleware/validate'
import { ticketSchema } from '../utils/validator'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

route.get('/event/:ticketID', ticketController.getTicketByEvent)
route.get('/ticket-list', ticketController.getListofTicketByUser)

route
  .get('/', ticketController.getTicket)
  .get('/:id', ticketController.findTicketById)
  .post('/', validate(ticketSchema), ticketController.createTicket)
  .put('/:id', validate(ticketSchema), ticketController.updateTicket)
  .delete('/:id', ticketController.deleteTicket)

export default route
