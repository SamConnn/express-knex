/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import userController from '../controller/user.controller'
import { validateRequest } from '../middleware/validate'
import { loopRoute } from '../utils/route'
import { userSchema } from '../utils/validator'

const route = express.Router()

route.post('/sign-up', authController.signup)
route.post('/log-in', authController.login)

route.use(authController.protect, authController.restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/', middleware: [], controller: userController.getUser },
  { method: 'get', path: '/:id', middleware: [], controller: userController.findUserById },
  { method: 'post', path: '/', middleware: [validateRequest(userSchema)], controller: userController.createUser },
  { method: 'put', path: '/:id', middleware: [validateRequest(userSchema)], controller: userController.updateUser },
  { method: 'delete', path: '/:id', middleware: [], controller: userController.deleteUser }
]

loopRoute(routes, route)

export default route
