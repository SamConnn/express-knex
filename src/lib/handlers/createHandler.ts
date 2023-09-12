/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { errors } from '../constants'
import { CustomError } from '../errors'
import logger from '../logger/logger'
/**
 * create handler function
 * @param  {function} handler  logic handler to be executed
 * @returns {object} whatever "next" returns
 */
const createHandler = (handler: any): object => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let error: any
    try {
      await handler(req, res)
    } catch (err) {
      if (err instanceof CustomError) {
        error = err
        if (!err.statusCode) {
          logger.errorLogger(err, req, res)
          return res.status(errors.statusCodes.INTERNAL_SERVER_ERROR).send({
            code: errors.statusCodes.INTERNAL_SERVER_ERROR,
            statusCode: errors.codes.INTERNAL_SERVER_ERROR,
            message: err.message ? err.message : 'Unhandled Exception'
          })
        }
        return res.status(err.statusCode).send({
          code: err.code,
          statusCode: err.statusCode,
          message: err.message
        })
      }
      next(error)
    }
  }
}

export default createHandler
