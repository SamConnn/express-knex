/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import eventController from '../controller/event.controller'

const route = express.Router()

route.use(authController.protect, authController.restrictTo('Admin'))

route
  .get('/', eventController.getEvent)
  .get('/:id', eventController.findEventById)
  .post('/', eventController.createEvent)
  .put('/:id', eventController.updateEvent)
  .delete('/:id', eventController.deleteEvent)

export default route
