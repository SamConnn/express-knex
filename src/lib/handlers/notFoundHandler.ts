/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { NotFoundError } from '../errors'

/**
 * not found handler function
 * @param  {object}   req  incoming request
 * @param  {object}   res  response object
 * @param  {function} next next function
 * @returns {object} whatever "next" returns
 */
const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.route) {
    throw new NotFoundError("Page you're request not found")
  }
  next()
}

export default notFoundHandler
