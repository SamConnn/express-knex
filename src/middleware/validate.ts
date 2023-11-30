import { type NextFunction, type Request } from 'express'
import { BadRequestError } from '../lib/errors'

export const validateRequest = (schema: any) => async (req: Request, res: any, next: NextFunction): Promise<any> => {
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
