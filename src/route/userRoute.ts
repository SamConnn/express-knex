/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import userController from '../controller/userController'

const route = express.Router()

route
  .get('/', userController.getUser)
  .get('/:id', userController.findUserById)
  .post('/', userController.createUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)

export default route
