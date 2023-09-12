import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * NotFoundError
 *
 * @class NotFoundError
 * @extends {CustomError}
 */
const NotFoundError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(
      message ?? errors.messages.NOT_FOUND,
      errors.codes.NOT_FOUND,
      errors.statusCodes.NOT_FOUND
    )
  }
}

export default NotFoundError
