import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * InternalServerError
 *
 * @class InternalServerError
 * @extends {CustomError}
 */
const InternalServerError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(
      message ?? errors.messages.INTERNAL_SERVER_ERROR,
      errors.codes.INTERNAL_SERVER_ERROR,
      errors.statusCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export default InternalServerError
