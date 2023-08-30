import express from 'express'
import userController from '../controller/userController'

const r = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
r.get('/', (userController.getUser))

export default r
