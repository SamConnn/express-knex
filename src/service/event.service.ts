/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Response } from 'express'
import { type Knex } from 'knex'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import { eventSchema } from '../contanst'
import { createEventModel, deleteEventModel, getEventModel, updateEventModel } from '../model/event.model'
import { handleErrorValidationArray } from '../utils/appError'
import { vali } from '../utils/validator'

export const getEventService = async (
  page: number,
  limit: number
): Promise<any> => await withTransaction(knex, async (trx: Knex) => await getEventModel(trx, page, limit))

export const CreateEventService = async (
  body: any,
  res: Response
): Promise<any> => {
  const check = vali.compile(eventSchema)
  const invalid = check(body)

  if (!invalid) {
    return res.status(400).json({
      status: 'fail',
      message: handleErrorValidationArray(invalid)
    })
  }
  return await withTransaction(knex, async (trx: Knex) => await createEventModel(body, trx))
}

export const updateEventService = async (
  id: string,
  body: any,
  res: Response
): Promise<any> => {
  const check = vali.compile(eventSchema)
  const invalid = check(body)

  if (!invalid) {
    return res.status(400).json({
      status: 'fail',
      message: handleErrorValidationArray(invalid)
    })
  }
  return await withTransaction(knex, async (trx: Knex) => await updateEventModel(id, body, trx))
}

export const deleteEventService = async (
  id: string
): Promise<any> => await withTransaction(knex, async (trx: Knex) => await deleteEventModel(id, trx))
