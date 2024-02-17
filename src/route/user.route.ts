/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { login, protect, restrictTo, signup } from '../controller/auth.controller'
import { validateRequest } from '../middleware/validate'
import { type Request, type Response, type NextFunction } from 'express'
import {
  getUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controller/user.controller'
import { userSchema } from '../utils/validator'
import { applyRoutes } from '../utils/route'

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
type Route = [string, string, MiddlewareFunction[], MiddlewareFunction]

const route = express.Router()

route.post('/sign-up', signup)
route.post('/log-in', login)

route.use(protect, restrictTo('Admin'))

const routes: Route[] = [
  ['get', '/', [], getUser],
  ['get', '/:id', [], findUserById],
  ['post', '/', [validateRequest(userSchema)], createUser],
  ['put', '/:id', [validateRequest(userSchema)], updateUser],
  ['delete', '/:id', [], deleteUser]
]

applyRoutes(routes, route)

export default route
