/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { type Request, type Response, type NextFunction } from 'express'
import {
  getEvent,
  findEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controller/event.controller'
import { validateRequest } from '../middleware/validate'
import { eventSchema } from '../utils/validator'
import { applyRoutes } from '../utils/route'
import { protect, restrictTo } from '../controller/auth.controller'

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
type Route = [string, string, MiddlewareFunction[], MiddlewareFunction]

const route = express.Router()

route.use(protect, restrictTo('Admin'))

const routes: Route[] = [
  ['get', '/', [], getEvent],
  ['get', '/:id', [], findEventById],
  ['post', '/', [validateRequest(eventSchema)], createEvent],
  ['put', '/:id', [validateRequest(eventSchema)], updateEvent],
  ['delete', '/:id', [], deleteEvent]
]

applyRoutes(routes, route)

export default route
