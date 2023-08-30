import { type Request, type Response } from 'express'
import { testTransaction } from '../../model/testModel'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'

const getTest = async (req: Request, res: Response): Promise<any> => {
  await withTransaction(knex, testTransaction)
    .then((result) => {
      res.status(200).json({
        status: 'success',
        message: 'Hello from the server side!',
        result
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

export default { getTest }
