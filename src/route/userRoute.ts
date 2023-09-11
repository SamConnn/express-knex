/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import authController from '../controller/authController'
import userController from '../controller/userController'

const route = express.Router()

route.post('/sign-up', authController.signup)
route.get('/log-in', authController.login)

route.use(authController.protect)

route
  .get('/', userController.getUser)
  .get('/:id', userController.findUserById)
  .post('/', userController.createUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)

export default route
