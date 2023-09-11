/* eslint-disable @typescript-eslint/explicit-function-return-type */
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
dotenv.config({ path: './.env' })

const { JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIRES_IN } = process.env

const signToken = (id: string): string => {
  const secret = JWT_SECRET as string
  return jwt.sign({ id }, secret, {
    expiresIn: JWT_EXPIRES_IN
  })
}

interface User {
  id: string
  username: string
  email: string
  password?: string
}

export const createSendToken = (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
): void => {
  const token = signToken(user.id)

  const JWT_COOKIE = JWT_COOKIE_EXPIRES_IN as unknown as number

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + JWT_COOKIE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  })

  // Remove password from output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user
  })
}

export const encryptPassword = async (password: string) =>
  await bcrypt.hash(password, 12)

export const decryptPassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash)
