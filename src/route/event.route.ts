/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  getEvent,
  findEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controller/event.controller'
import { validateRequest } from '../middleware/validate'
import { eventSchema } from '../utils/validator'
import { type RouteDetails, applyRoutes } from '../utils/route'
import { protect, restrictTo } from '../controller/auth.controller'

const route = express.Router()

route.use(protect, restrictTo('Admin'))

const routes: Record<string, RouteDetails[]> = {
  get: [
    ['/', [], getEvent],
    ['/:id', [], findEventById]
  ],
  post: [
    ['/', [validateRequest(eventSchema)], createEvent]
  ],
  put: [
    ['/:id', [validateRequest(eventSchema)], updateEvent]
  ],
  delete: [
    ['/:id', [], deleteEvent]
  ]
}

applyRoutes(routes, route)

export default route
