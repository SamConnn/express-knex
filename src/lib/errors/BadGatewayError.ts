import { errors } from '../constants'
import CustomError from './CustomError'

/**
 * BadGatewayError
 *
 * @class BadGatewayError
 * @extends {CustomError}
 */
const BadGatewayError = class extends CustomError {
  /**
   * constructor
   * @param  {string} message - custom error message
   */
  constructor (message: string) {
    super(message ?? errors.messages.BAD_GATEWAY, errors.codes.BAD_GATEWAY, errors.statusCodes.BAD_GATEWAY)
  }
}

export default BadGatewayError
