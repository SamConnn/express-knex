import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * UnauthorizedError
 *
 * @class UnauthorizedError
 * @extends {CustomError}
 */
const UnauthorizedError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(
      message ?? errors.messages.UNAUTHORIZED,
      errors.codes.UNAUTHORIZED,
      errors.statusCodes.UNAUTHORIZED
    )
  }
}

export default UnauthorizedError
