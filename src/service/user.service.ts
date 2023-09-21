/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction } from 'express'
import { type Knex } from 'knex'
import { encryptPassword } from '../config/auth'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import { CustomError } from '../lib/errors'
import {
  createUserModel,
  deleteUserModel,
  findUserByEmail,
  getUserModel,
  updateUserModel
} from '../model/user.model'

export const getUserService = async (
  page: number,
  limit: number
): Promise<any> =>
  await withTransaction(
    knex,
    async (trx: Knex) => await getUserModel(trx, page, limit)
  )

export const CreateUserService = async (body: any, next: NextFunction): Promise<any> => {
  const { email, password } = body
  const isUserExist = await findUserByEmail(email, knex)

  if (isUserExist.length > 0) {
    next(new CustomError('User already exist', 'Can not create user', 400))
    return
  }
  const passEncrypt = await encryptPassword(password)

  return await withTransaction(
    knex,
    async (trx: Knex) => await createUserModel({
      username: body.username,
      email: body.email,
      password: passEncrypt,
      role: body.role
    }, trx)
  )
}

export const updateUserService = async (
  id: string,
  body: any
): Promise<any> => {
  return await withTransaction(
    knex,
    async (trx: Knex) => await updateUserModel(id, body, trx)
  )
}

export const deleteUserService = async (id: string): Promise<any> =>
  await withTransaction(
    knex,
    async (trx: Knex) => await deleteUserModel(id, trx)
  )
