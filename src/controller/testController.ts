import { type Request, type Response } from 'express'
import { testTransaction } from '../../model/testModel'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'

const getTest = async (req: Request, res: Response): Promise<void> => {
  withTransaction(knex, testTransaction)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.error(error)
    })

  res.status(200).json({
    status: 'success',
    message: 'Hello from the server side!'
  })
}

export default { getTest }
