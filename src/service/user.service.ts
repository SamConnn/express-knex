/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Response } from 'express'
import { type Knex } from 'knex'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import { userSchema } from '../contanst'
import { createUserModel, deleteUserModel, updateUserModel } from '../model/userModel'
import { handleErrorValidationArray } from '../utils/appError'
import { vali } from '../utils/validator'

export const CreateUserService = async (
  body: any,
  res: Response
): Promise<any> => {
  const check = vali.compile(userSchema)
  const invalid = check(body)

  if (!invalid) {
    return res.status(400).json({
      status: 'fail',
      message: handleErrorValidationArray(invalid)
    })
  }
  return await withTransaction(knex, async (trx: Knex) => await createUserModel(body, trx))
}

export const updateUserService = async (
  id: string,
  body: any,
  res: Response
): Promise<any> => {
  const check = vali.compile(userSchema)
  const invalid = check(body)

  if (!invalid) {
    return res.status(400).json({
      status: 'fail',
      message: handleErrorValidationArray(invalid)
    })
  }
  return await withTransaction(knex, async (trx: Knex) => await updateUserModel(id, body, trx))
}

export const deleteUserService = async (
  id: string
): Promise<any> => await deleteUserModel(id, knex)
