import { type NextFunction, type Request, type Response } from 'express'
import _ from 'lodash'
import { CustomError } from '../errors'
import logger from '../logger/logger'

/**
 * error handler function
 * @param  {object}   err  http exception
 * @param  {object}   req  incoming request
 * @param  {object}   res  response object
 * @param  {function} next next function
 * @returns {object}        whatever "next" returns
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof CustomError) {
    if (err.isCustomError) {
      logger.errorLogger(err, req, res)
      res.status(err.statusCode).send({
        ..._.pick(err, ['statusCode', 'code', 'message'])
      })
    } else {
      res.status(500).send(err)
    }
    logger.errorLogger(err, req, res)
    next()
  }
}

export default errorHandler
