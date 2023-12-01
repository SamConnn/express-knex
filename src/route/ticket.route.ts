/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { protect, restrictTo } from '../controller/auth.controller'
import {
  createTicket,
  deleteTicket,
  findTicketById,
  getListOfTicketUser,
  getTicket,
  getTicketByEvent,
  updateTicket
} from '../controller/ticket.controller'
import { validateRequest } from '../middleware/validate'
import { Routes } from '../utils/route'
import { ticketSchema } from '../utils/validator'

const route = express.Router()

route.use(protect, restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/event/:ticketID', middleware: [], controller: getTicketByEvent },
  { method: 'get', path: '/user-ticket', middleware: [], controller: getListOfTicketUser },
  { method: 'get', path: '/', middleware: [], controller: getTicket },
  { method: 'get', path: '/:id', middleware: [], controller: findTicketById },
  { method: 'post', path: '/', middleware: [validateRequest(ticketSchema)], controller: createTicket },
  { method: 'put', path: '/:id', middleware: [validateRequest(ticketSchema)], controller: updateTicket },
  { method: 'delete', path: '/:id', middleware: [], controller: deleteTicket }
]

Routes(routes, route)

export default route
