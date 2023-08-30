import { type Request, type Response } from 'express'

const getUser = (req: Request, res: Response): Response => {
  return res.status(200).json({
    status: 'success',
    message: 'Hello from the server side!'
  })
}

export default { getUser }
