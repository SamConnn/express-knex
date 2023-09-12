/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import knex from '../config/knex'
import { InternalServerError, NotFoundError } from '../lib/errors'
import { getUserByIdModel, getUserModel } from '../model/userModel'
import {
  CreateUserService,
  deleteUserService,
  updateUserService
} from '../service/user.service'

const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page = 1, limit = 10 } = req.query

  await getUserModel(knex, Number(page), Number(limit))
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err) => {
      next(new NotFoundError(err))
    })
}

const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await getUserByIdModel(id, knex)
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err) => {
      next(new NotFoundError(err))
    })
}

const createUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req

  CreateUserService(body, res)
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err) => {
      next(new InternalServerError(err))
    })
}

const updateUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params
  const { body } = req

  updateUserService(id, body, res)
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err) => {
      next(new InternalServerError(err))
    })
}

const deleteUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  await deleteUserService(id)
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        data: result
      })
    })
    .catch((err) => {
      next(new InternalServerError(err))
    })
}

export default { getUser, createUser, updateUser, deleteUser, findUserById }
