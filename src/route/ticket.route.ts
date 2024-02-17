/* eslint-disable @typescript-eslint/no-misused-promises */
import { protect, restrictTo } from '../controller/auth.controller'
import express, { type Request, type Response, type NextFunction } from 'express'
import {
  getTicket,
  findTicketById,
  createTicket,
  updateTicket,
  deleteTicket
} from '../controller/ticket.controller'
import { validateRequest } from '../middleware/validate'
import { ticketSchema } from '../utils/validator'
import { applyRoutes } from '../utils/route'

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
type Route = [string, string, MiddlewareFunction[], MiddlewareFunction]

const route = express.Router()

route.use(protect, restrictTo('Admin'))

const routes: Route[] = [
  ['get', '/', [], getTicket],
  ['get', '/:id', [], findTicketById],
  ['post', '/', [validateRequest(ticketSchema)], createTicket],
  ['put', '/:id', [validateRequest(ticketSchema)], updateTicket],
  ['delete', '/:id', [], deleteTicket]
]

applyRoutes(routes, route)

export default route
