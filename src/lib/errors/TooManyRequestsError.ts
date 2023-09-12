import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * TooManyRequestsError
 *
 * @class TooManyRequestsError
 * @extends {CustomError}
 */
const TooManyRequestsError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(
      message ?? errors.messages.TOO_MANY_REQUESTS,
      errors.codes.TOO_MANY_REQUESTS,
      errors.statusCodes.TOO_MANY_REQUESTS
    )
  }
}

export default TooManyRequestsError
