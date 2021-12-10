import { Request, Response, NextFunction } from 'express'
import { IUsername } from '../routes/interfaces'
import { userValidator } from '../services/validators/index'
import {
  validateUsername,
  validateRequestBody,
  validateSocketID
} from '../services/validators/request'

const validateBeforeCreateUser = async (
  req: Request<IUsername>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, socketID } = req.body
    validateRequestBody(req.body)
    validateSocketID(socketID)
    validateUsername(username)
    await userValidator.checkIfUsernameIsTaken(username)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeCreateUser }
