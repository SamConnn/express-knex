import { errors } from '../constants'

/**
 * CustomError
 *
 * The CustomError is a base class that allows you to create custom HTTP exceptions
 *
 * @class CustomError
 * @extends {Error}
 */
class CustomError extends Error {
  code: any
  statusCode?: any
  isCustomError: boolean
  /**
   * constructor
   * @param  {string} message - error message
   * @param  {string} code - error code
   * @param  {number} statusCode - error statusCode
   */
  constructor (
    message: string = errors.messages.INTERNAL_SERVER_ERROR,
    code: string = errors.codes.INTERNAL_SERVER_ERROR,
    statusCode: number = errors.statusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.code = code
    this.statusCode = statusCode
    this.message = message
    this.isCustomError = true
  }
}

export default CustomError
