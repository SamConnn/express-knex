/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import userController from '../controller/user.controller'
import { validate } from '../middleware/validate'
import { userSchema } from '../utils/validator'

const route = express.Router()

route.post('/sign-up', authController.signup)
route.post('/log-in', authController.login)

route.use(authController.protect, authController.restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/', middleware: [], controller: userController.getUser },
  { method: 'get', path: '/:id', middleware: [], controller: userController.findUserById },
  { method: 'post', path: '/', middleware: [validate(userSchema)], controller: userController.createUser },
  { method: 'put', path: '/:id', middleware: [validate(userSchema)], controller: userController.updateUser },
  { method: 'delete', path: '/:id', middleware: [], controller: userController.deleteUser }
]

routes.forEach(({ method, path, middleware, controller }) => {
  route[method](path, ...middleware, controller)
})

export default route
