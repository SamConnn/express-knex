/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { login, protect, restrictTo, signup } from '../controller/auth.controller'
import { createUser, deleteUser, findUserById, getUser, updateUser } from '../controller/user.controller'
import { validateRequest } from '../middleware/validate'
import { Routes } from '../utils/route'
import { userSchema } from '../utils/validator'

const route = express.Router()

route.post('/sign-up', signup)
route.post('/log-in', login)

route.use(protect, restrictTo('Admin'))

const routes = [
  { method: 'get', path: '/', middleware: [], controller: getUser },
  { method: 'get', path: '/:id', middleware: [], controller: findUserById },
  { method: 'post', path: '/', middleware: [validateRequest(userSchema)], controller: createUser },
  { method: 'put', path: '/:id', middleware: [validateRequest(userSchema)], controller: updateUser },
  { method: 'delete', path: '/:id', middleware: [], controller: deleteUser }
]

Routes(routes, route)

export default route
