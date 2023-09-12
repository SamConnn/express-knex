/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'
import { CustomError } from '../errors'
import logger from '../logger/logger'
/**
 * create web handler function
 * @param  {function} handler  logic handler to be executed
 * @returns {object} whatever "next" returns
 */
const createWebHandler = (handler: any): object => {
  let response: object
  response = async (req: Request, res: Response) => {
    try {
      await handler(req, res)
    } catch (err) {
      if (err instanceof CustomError) {
        if (!err.statusCode) {
          logger.errorLogger(err, req, res)
          response = res.status(500).send({
            code: 500,
            statusCode: 'INTERNAL_SERVER_ERROR',
            message: err.message
          })
        }
        response = res.status(err.statusCode).send({
          code: err.code,
          statusCode: err.statusCode,
          message: err.message
        })
      }
    }
  }
  return response
}

export default createWebHandler
