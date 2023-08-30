import { type NextFunction, type Request, type Response } from 'express'
import AppError from './../utils/appError'

const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message)

  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = (): AppError =>
  new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = (): AppError =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendErrorDev = (err: any, req: Request, res: Response): any => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    })
  }

  console.error('ERROR 💥', err)
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  })
}

const sendErrorProd = (err: any, req: Request, res: Response): any => {
  if (req.originalUrl.startsWith('/api')) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    }

    console.error('ERROR 💥', err)
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    })
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (err.isOperational) {
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    })
    return
  }

  console.error('ERROR 💥', err)
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  })
}

export default (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  err.statusCode = Boolean(err.statusCode) || 500
  err.status = Boolean(err.status) || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    error.message = err.message

    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error)
    }
    if (error.name === 'JsonWebTokenError') error = handleJWTError()
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()

    sendErrorProd(error, req, res)
  }
}
