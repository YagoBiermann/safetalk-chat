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
  const cookieToken = req.cookies.token

  try {
    console.log('validating before get user')
    headerValidator.checkAuthorization(cookieToken)
    validateUsername(username)
    const token = cookieToken.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET)
    await userValidator.checkIfUserExists(username)

    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetUser }
