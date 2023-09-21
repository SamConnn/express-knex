import { type NextFunction, type Request, type Response } from 'express'
import { BadRequestError } from '../lib/errors'

export const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    })
    next()
  } catch (err: any) {
    next(new BadRequestError(err.message))
  }
}
