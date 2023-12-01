/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import eventController from '../controller/event.controller'
import { validateRequest } from '../middleware/validate'
import { Routes } from '../utils/route'
import { eventSchema } from '../utils/validator'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/', middleware: [], controller: eventController.getEvent },
  { method: 'get', path: '/:id', middleware: [], controller: eventController.findEventById },
  { method: 'post', path: '/', middleware: [validateRequest(eventSchema)], controller: eventController.createEvent },
  { method: 'put', path: '/:id', middleware: [validateRequest(eventSchema)], controller: eventController.updateEvent },
  { method: 'delete', path: '/:id', middleware: [], controller: eventController.deleteEvent }
]

Routes(routes, route)

export default route
