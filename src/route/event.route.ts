/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import eventController from '../controller/event.controller'
import { validate } from '../middleware/validate'
import { eventSchema } from '../utils/validator'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

route
  .get('/', eventController.getEvent)
  .get('/:id', eventController.findEventById)
  .post('/', validate(eventSchema), eventController.createEvent)
  .put('/:id', validate(eventSchema), eventController.updateEvent)
  .delete('/:id', eventController.deleteEvent)

export default route
