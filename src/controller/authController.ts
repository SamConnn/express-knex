/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import {
  createSendToken,
  decryptPassword,
  encryptPassword
} from '../config/auth'
import knex from '../config/knex'
import { CustomError, InternalServerError, UnauthorizedError } from '../lib/errors'
import {
  createUserModel,
  findUserByEmail,
  getUserByIdModel
} from '../model/userModel'
import Email from '../utils/email'

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const url = `${req.protocol}://${req.get('host')}/me`

  const { email, username, password, role } = req.body

  const passEncrypt = await encryptPassword(password)

  const isUserExist = await findUserByEmail(email, knex)

  if (isUserExist.length > 0) {
    next(new CustomError('User already exist', 'Can not create user', 400))
    return
  }

  createUserModel(
    {
      username,
      email,
      password: passEncrypt,
      role
    },
    knex
  )
    .then(async (result: any) => {
      await Email(result[0], url).sendWelcome()
      createSendToken(result[0], 201, req, res)
    })
    .catch((err) => {
      next(new InternalServerError(err.message))
    })
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!'
      })
    }

    const user: any = await findUserByEmail(email, knex)

    const isPasswordCorrect = await decryptPassword(password, user[0].password)

    if (!isPasswordCorrect) {
      next(new CustomError('Incorrect email or password', '', 401))
    }
    createSendToken(user, 200, req, res)
  } catch (error) {
    if (error instanceof InternalServerError) {
      throw new InternalServerError(error.message)
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // 1) Getting token and check of it's there
    let token: string | undefined
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      next(new UnauthorizedError('You are not logged in! Please log in to get access.'))
      return
    }

    // 2) Verification token
    const decoded: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    // 3) Check if user still exists
    const currentUser = await getUserByIdModel(decoded.id, knex)
    if (!currentUser) {
      next(new UnauthorizedError('The user belonging to this token does no longer exist.'))
      return
    }

    /* to be implemented later */
    // 4) Check if user changed password after the token was issued
    //   if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     next(
    //       new AppError('User recently changed password! Please log in again.', 401)
    //     )
    //     return
    //   }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.complete = true
    res.locals.user = currentUser
    next()
  } catch (error) {
    if (error instanceof InternalServerError) {
      throw new InternalServerError(error.message)
    }
  }
}

export const restrictTo = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.user

    if (!roles.includes(res.locals.user.role)) {
      next(new UnauthorizedError('You do not have permission to perform this action'))
      return
    }

    // Check if user still exists
    const findRole = await getUserByIdModel(id, knex)

    if (!findRole || findRole.role !== 'Admin') {
      next(new UnauthorizedError('You do not have permission to perform this action'))
      return
    }
    next()
  }
}

export default { signup, login, protect, restrictTo }
