/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import {
  protect, restrictTo
} from '../controller/auth.controller'
import {
  createEvent,
  deleteEvent,
  findEventById,
  getEvent,
  updateEvent
} from '../controller/event.controller'
import { validateRequest } from '../middleware/validate'
import { Routes } from '../utils/route'
import { eventSchema } from '../utils/validator'

const route = express.Router()

route.use(protect, restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/', middleware: [], controller: getEvent },
  { method: 'get', path: '/:id', middleware: [], controller: findEventById },
  { method: 'post', path: '/', middleware: [validateRequest(eventSchema)], controller: createEvent },
  { method: 'put', path: '/:id', middleware: [validateRequest(eventSchema)], controller: updateEvent },
  { method: 'delete', path: '/:id', middleware: [], controller: deleteEvent }
]

Routes(routes, route)

export default route
