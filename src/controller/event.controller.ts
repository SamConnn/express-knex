/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import knex from '../config/knex'
import { InternalServerError, NotFoundError } from '../lib/errors'
import { getEventByIdModel } from '../model/event.model'
import {
  create as createEventService,
  destroy as deleteEventService,
  search as getEventService,
  update as updateEventService
} from '../service/event.service'

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  getEventService(Number(page), Number(limit))
    .then(async (result) => res.status(200).json({ data: result }))
    .catch((err: string) => { next(new InternalServerError(err)) })
}

export const findEventById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => await getEventByIdModel(String(req.params?.id), knex)
  .then((result) => {
    if (!result) {
      next(new NotFoundError('Event not found')); return
    }
    return res.status(200).json({ data: result })
  })
  .catch((err: string) => { next(new InternalServerError(err)) })

export const createEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await createEventService(req.body)
  .then((result) => res.status(200).json({ data: result }))
  .catch((err: string) => { next(new InternalServerError(err)) })

export const updateEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await updateEventService(String(req.params?.id), req.body)
  .then((result) => {
    if (!result) {
      next(new NotFoundError('Event not found'))
      return
    }
    return res.status(200).json({ data: result })
  })
  .catch((err: string) => { next(new InternalServerError(err)) })

export const deleteEvent = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await deleteEventService(String(req.params?.id))
  .then((result) => res.status(200).json({ data: result }))
  .catch((err: string) => { next(new InternalServerError(err)) })
