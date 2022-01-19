import { Request, Response, NextFunction } from 'express'
import { IRoomBody } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validations/index'
import {
  validateRequestBody,
  validateRoomCode,
  validateUsername
} from '../services/validations/request'

const validateBeforeJoinRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, roomCode } = req.body
  const roomValidator = new ValidatorFactory().createRoomValidator()

  try {
    console.log('validating before join room')
    validateRequestBody(req.body)
    validateUsername(username)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeJoinRoom }
