import { IRoomBody } from '../routes/interfaces'
import { Request, Response, NextFunction } from 'express'
import { ValidatorFactory } from '../services/validations'
import {
  validateRequestBody,
  validateRoomCode,
  validateUsername
} from '../services/validations/request'

const validateBeforeCreateRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, roomCode } = req.body
  const roomValidator = new ValidatorFactory().createRoomValidator()

  try {
    validateRequestBody(req.body)
    console.log(`validating user: ${username}`)
    validateUsername(username)
    console.log(`validating room: ${roomCode}`)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomAlreadyExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeCreateRoom }
