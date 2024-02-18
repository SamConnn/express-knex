/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { login, protect, restrictTo, signup } from '../controller/auth.controller'
import { validateRequest } from '../middleware/validate'
import {
  getUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controller/user.controller'
import { userSchema } from '../utils/validator'
import { type RouteDetails, applyRoutes } from '../utils/route'

const route = express.Router()

route.post('/sign-up', signup)
route.post('/log-in', login)

route.use(protect, restrictTo('Admin'))

const routes: Record<string, RouteDetails[]> = {
  get: [
    ['/', [], getUser],
    ['/:id', [], findUserById]
  ],
  post: [
    ['/', [validateRequest(userSchema)], createUser]
  ],
  put: [
    ['/:id', [validateRequest(userSchema)], updateUser]
  ],
  delete: [
    ['/:id', [], deleteUser]
  ]
}

applyRoutes(routes, route)

export default route
