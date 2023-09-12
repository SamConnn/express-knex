import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * RequestTimeoutError
 *
 * @class RequestTimeoutError
 * @extends {CustomError}
 */
const RequestTimeoutError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(
      message ?? errors.messages.REQUEST_TIMEOUT,
      errors.codes.REQUEST_TIMEOUT,
      errors.statusCodes.REQUEST_TIMEOUT
    )
  }
}

export default RequestTimeoutError
