import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * ForbiddenError
 *
 * @class ForbiddenError
 * @extends {CustomError}
 */
const ForbiddenError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(message ?? errors.messages.FORBIDDEN, errors.codes.FORBIDDEN, errors.statusCodes.FORBIDDEN)
  }
}
export default ForbiddenError
