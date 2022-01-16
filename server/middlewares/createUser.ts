import { Request, Response, NextFunction } from 'express'
import { IUsername } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validators/index'
import {
  validateUsername,
  validateRequestBody
} from '../services/validators/request'

const validateBeforeCreateUser = async (
  req: Request<IUsername>,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body
  const userValidator = new ValidatorFactory().createUserValidator()

  try {
    console.log('validating before create user')
    validateRequestBody(req.body)
    validateUsername(username)
    await userValidator.checkIfUsernameIsTaken(username)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeCreateUser }
