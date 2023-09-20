/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import knex from '../config/knex'
import { InternalServerError, NotFoundError } from '../lib/errors'
import { getEventByIdModel } from '../model/event.model'
import { CreateEventService, deleteEventService, getEventService, updateEventService } from '../service/event.service'

// const redis = createClient({
//   password: 'secret_redis'
// })
// void redis.connect()

const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  await getEventService(Number(page), Number(limit))
    .then(async (result) =>
      res.status(200).json({
        status: 'success',
        data: result
      })
    )
    .catch((err) => {
      next(new NotFoundError(err))
    })
}

const findEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await getEventByIdModel(id, knex)
    .then((result) =>
      res.status(200).json({
        status: 'success',
        data: result
      })
    )
    .catch((err) => {
      next(new NotFoundError(err))
    })
}

const createEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req

  CreateEventService(body, res)
    .then((result) =>
      res.status(200).json({
        status: 'success',
        data: result
      })
    )
    .catch((err) => {
      next(new InternalServerError(err))
    })
}

const updateEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  updateEventService(id, body, res)
    .then((result) =>
      res.status(200).json({
        status: 'success',
        data: result
      })
    )
    .catch((err) => {
      next(new InternalServerError(err))
    })
}

const deleteEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  deleteEventService(id)
    .then((result) =>
      res.status(200).json({
        status: 'success',
        data: result
      })
    )
    .catch((err) => {
      next(new InternalServerError(err))
    })
}

export default { getEvent, createEvent, updateEvent, deleteEvent, findEventById }