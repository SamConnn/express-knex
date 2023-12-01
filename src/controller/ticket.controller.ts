/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { NotFoundError } from '../lib/errors'
import { getTicketByEventModel, getTicketByIdModel } from '../model/ticket.model'
import {
  create as createTicketService,
  destroy as deleteTicketService,
  getListOfTicketByUser,
  search as getTicketService, update as updateTicketService
} from '../service/ticket.service'
import { responseError } from '../utils/error-handler'

export const getTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  await getTicketService(Number(page), Number(limit))
    .then(async (result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}

export const getListOfTicketUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { page = 1, limit = 10 } = req.query
  const userID = res.locals.user.id

  await getListOfTicketByUser(Number(page), Number(limit), userID)
    .then(async (result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}

export const getTicketByEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { ticketID } = req.params

  await getTicketByEventModel(ticketID)
    .then(async (result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}

export const findTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await getTicketByIdModel(id)
    .then((result) => {
      if (!result) { next(new NotFoundError('Event not found')); return }
      return res.status(200).json(result)
    })
    .catch((err) => responseError(res, err))
}

export const createTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req

  createTicketService(res, body)
    .then((result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}

export const updateTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  updateTicketService(id, body)
    .then((result) => {
      if (!result) { next(new NotFoundError('Event not found')); return }
      return res.status(200).json(result)
    })
    .catch((err) => responseError(res, err))
}

export const deleteTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  deleteTicketService(id)
    .then((result) => res.status(200).json(result))
    .catch((err) => responseError(res, err))
}
