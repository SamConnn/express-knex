/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { InternalServerError, NotFoundError } from '../lib/errors'
import { getTicketByEventModel, getTicketByIdModel } from '../model/ticket.model'
import {
  create as createTicketService,
  destroy as deleteTicketService,
  getListOfTicketByUser as getListOfTicketByUserService,
  search as getTicketService, update as updateTicketService
} from '../service/ticket.service'

export const getTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  await getTicketService(Number(page), Number(limit))
    .then(async (result) => res.status(200).json(result))
    .catch((err: string) => { next(new NotFoundError(err)) })
}

export const getListOfTicketByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { page = 1, limit = 10 } = req.query
  const userID = res.locals.user.id

  await getListOfTicketByUserService(Number(page), Number(limit), String(userID))
    .then(async (result) => res.status(200).json(result))
    .catch((err: string) => { next(new NotFoundError(err)) })
}

export const getTicketByEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { ticketID } = req.params

  await getTicketByEventModel(ticketID)
    .then(async (result) => res.status(200).json(result))
    .catch((err: string) => { next(new NotFoundError(err)) })
}

export const findTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => await getTicketByIdModel(req.params?.id)
  .then((result) => {
    if (!result) { next(new NotFoundError('Event not found')); return }
    return res.status(200).json(result)
  })
  .catch((err: string) => { next(new NotFoundError(err)) })

export const createTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await createTicketService(res, req.body)
  .then((result) => res.status(200).json(result))
  .catch((err: string) => { next(new InternalServerError(err)) })

export const updateTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  updateTicketService(String(id), body)
    .then((result) => {
      if (!result) { next(new NotFoundError('Event not found')); return }
      return res.status(200).json(result)
    })
    .catch((err: string) => { next(new InternalServerError(err)) })
}

export const deleteTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<any> => await deleteTicketService(String(req.params?.id))
  .then((result) => res.status(200).json(result))
  .catch((err: string) => { next(new InternalServerError(err)) })
