import { type NextFunction, type Request, type Response } from 'express'
import { transports as _transports, createLogger } from 'winston'
const logger = createLogger({
  transports: [new _transports.Console()]
})

const errorLogger = (err: any, req: Request, res: Response): void => {
  const start = new Date().getTime()
  res.on('finish', () => {
    const elapsed = new Date().getTime() - start
    logger.error(
      `${req.method} ${req.originalUrl} ${err.statusCode} - from IP : ${req.ip} - error message: ${err.message} - ${elapsed}ms`
    )
  })
}

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = new Date().getTime()
  res.on('finish', () => {
    const elapsed = new Date().getTime() - start
    if (res.statusCode < 400) {
      logger.info(
        `${req.method} ${req.originalUrl} ${res.statusCode} - from IP : ${req.ip} - ${elapsed}ms`
      )
    }
  })
  next()
}

export default {
  logger,
  requestLogger,
  errorLogger
}
