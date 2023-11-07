import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import path from 'path'

import NotFoundError from './lib/errors/NotFoundError'
import { errorHandler, notFoundHandler } from './lib/handlers'
import logger from './lib/logger/logger'
import { routes } from './route'
import { limiter } from './utils/rate-limit'
import useRoutes from './utils/route'

const app = express()

app.use(cors())
app.options('*', cors())
// Serving static files
app.use(express.static(path.join(__dirname, 'public')))
// Set security HTTP headers
app.use(helmet())
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api', limiter)
app.use(bodyParser.json({ limit: '10kb' }))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())
app.use(hpp({}))
app.use(compression())
useRoutes(app, routes)
app.all('*', (req, res, next) => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this server!`)
})
app.use(notFoundHandler)
//Error Handler
app.use(logger.requestLogger)
app.use(errorHandler)

export default app
