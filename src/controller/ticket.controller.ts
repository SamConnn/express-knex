/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { InternalServerError, NotFoundError } from '../lib/errors'
import { getTicketByEventModel, getTicketByIdModel } from '../model/ticket.model'
import {
  CreateTicketService,
  deleteTicketService,
  getListOfTicketByUserService,
  getTicketService, updateTicketService
} from '../service/ticket.service'

const getTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  await getTicketService(Number(page), Number(limit))
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

const getListOfTicketByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { page = 1, limit = 10 } = req.query
  const userID = res.locals.user.id

  await getListOfTicketByUserService(Number(page), Number(limit), userID)
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

const getTicketByEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { ticketID } = req.params

  await getTicketByEventModel(ticketID)
    .then(async (result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    }
    )
    .catch((err) => {
      next(new NotFoundError(err))
    })
}

const findTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await getTicketByIdModel(id)
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
    .catch((err) => {
      next(new NotFoundError(err))
    })
}

const createTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req

  CreateTicketService(res, body)
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

const updateTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  updateTicketService(id, body)
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
    .catch((err) => {
      next(new InternalServerError(err))
    })
}

const deleteTicket = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  deleteTicketService(id)
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

export default {
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  findTicketById,
  getTicketByEvent,
  getListOfTicketByUser
}
