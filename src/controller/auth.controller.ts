/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type Knex } from 'knex'
import {
  createSendToken,
  decryptPassword,
  encryptPassword
} from '../config/auth'
import knex from '../config/knex'
import { withTransaction } from '../config/transact'
import {
  CustomError,
  InternalServerError,
  UnauthorizedError
} from '../lib/errors'
import {
  createUserModel,
  findUserByEmail,
  getUserByIdModel
} from '../model/user.model'
import Email from '../utils/email'

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const url = `${req.protocol}://${req.get('host')}/me`

  const { email, username, password, role } = req.body

  const isUserExist = await findUserByEmail(email, knex)

  if (isUserExist.length > 0) {
    next(new CustomError('User already exist', 'Can not create user', 400))
    return
  }
  const passEncrypt = await encryptPassword(password)

  await withTransaction(
    knex,
    async (trx: Knex) =>
      await createUserModel(
        { email, username, password: passEncrypt, role },
        trx
      )
  )
    .then(async (result) => {
      createSendToken(result[0], 201, req, res)
      await Email(result[0], url).sendWelcome()
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
  const { email, password } = req.body

  // 1) Check if email and password exist
  if (!email ?? !password) {
    next(new CustomError('Please provide email and password!', '', 400))
    return
  }

  await findUserByEmail(email, knex).then(async (result) => {
    if (result.length === 0) {
      next(new CustomError('User not found', '', 404))
    } else {
      const isPasswordCorrect = await decryptPassword(
        password,
        result[0].password
      )

      if (!isPasswordCorrect) {
        next(new CustomError('Incorrect email or password', '', 401))
        return
      }

      createSendToken(result[0], 200, req, res)
    }
  })
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
    if (req.headers['x-api-key'] !== process.env.X_API_KEY) {
      next(new UnauthorizedError('You are not logged in! Please log in to get access.'))
      return
    }
    if (!token) {
      next(new UnauthorizedError('You are not logged in! Please log in to get access.'))
      return
    }

    // 2) Verification token
    let decoded: any
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (err) {
      next(new UnauthorizedError('You are not logged in! Please log in to get access.'))
      return
    }

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
      next(new InternalServerError(error.message))
    }
  }
}

export const restrictTo = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = res.locals.user

    if (!roles.includes(res.locals.user.role)) {
      next(
        new UnauthorizedError(
          'You do not have permission to perform this action'
        )
      )
      return
    }

    // Check if user still exists
    const findRole = await getUserByIdModel(id, knex)

    if (!findRole || findRole.role !== 'Admin') {
      next(
        new UnauthorizedError(
          'You do not have permission to perform this action'
        )
      )
      return
    }
    next()
  }
}

export default { signup, login, protect, restrictTo }
