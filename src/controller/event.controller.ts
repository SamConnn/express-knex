/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import knex from '../config/knex'
import { InternalServerError, NotFoundError } from '../lib/errors'
import { getEventByIdModel } from '../model/event.model'
import {
  create as CreateEventService,
  destroy as deleteEventService,
  search as getEventService,
  update as updateEventService
} from '../service/event.service'
import { responseError } from '../utils/error-handler'

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  await getEventService(Number(page), Number(limit))
    .then(async (result) => {
      res.status(200).json({
        status: 'success',
        data: result
      })
    }
    )
    .catch((err: string) => {
      next(new NotFoundError(err))
    })
}

export const findEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await getEventByIdModel(String(id), knex)
    .then((result) => {
      if (!result) {
        next(new NotFoundError('Event not found'))
        return
      }
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err: string) => {
      next(new NotFoundError(err))
    })
    .catch((err) => responseError(res, err))
}

export const createEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req

  CreateEventService(body)
    .then((result) =>
      res.status(200).json({
        status: 'success',
        data: result
      })
    )
    .catch((err: string) => {
      next(new InternalServerError(err))
    })
}

export const updateEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  updateEventService(String(id), body)
    .then((result) => {
      if (!result) {
        next(new NotFoundError('Event not found'))
        return
      }
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err: string) => {
      next(new InternalServerError(err))
    })
    .catch((err) => responseError(res, err))
}

export const deleteEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  deleteEventService(String(id))
    .then((result) =>
      res.status(200).json({
        status: 'success',
        data: result
      })
    )
    .catch((err: string) => {
      next(new InternalServerError(err))
    })
}
