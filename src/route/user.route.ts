/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/auth.controller'
import userController from '../controller/user.controller'

const route = express.Router()

route.post('/sign-up', authController.signup)
route.post('/log-in', authController.login)

route.use(authController.protect, authController.restrictTo('Admin'))

route
  .get('/', userController.getUser)
  .get('/:id', userController.findUserById)
  .post('/', userController.createUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)

export default route
