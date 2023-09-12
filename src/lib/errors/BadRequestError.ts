import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * BadRequestError
 *
 * @class BadRequestError
 * @extends {CustomError}
 */
const BadRequestError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(
      message ?? errors.messages.BAD_REQUEST,
      errors.codes.BAD_REQUEST,
      errors.statusCodes.BAD_REQUEST
    )
  }
}

export default BadRequestError
