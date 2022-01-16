import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ValidatorFactory } from '../services/validators/index'
import { validateUsername } from '../services/validators/request/'

const validateBeforeGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params
  const userValidator = new ValidatorFactory().createUserValidator()
  const headerValidator = new ValidatorFactory().createHeaderValidator()
  const cookieToken = req.headers.token as string

  try {
    console.log('validating before get user')
    headerValidator.checkAuthorization(cookieToken)
    validateUsername(username)
    const token = cookieToken.split(' ')[1]
    const socketID: string = jwt.verify(token, process.env.JWT_SECRET).sub
    await userValidator.checkIfUserExists(socketID)
    await userValidator.checkIfMatch(username)

    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetUser }
