class AppError extends Error {
  statusCode: number
  status: string
  isOperational: boolean
  constructor (message: string, statusCode: number) {
    super(message)

    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const handleErrorValidationArray = (err: any) => {
  if (Array.isArray(err)) {
    const error = err.map((el: any) => el.message).join(', ')
    return error
  } else {
    const error = err.message
    return error
  }
}

export default AppError
