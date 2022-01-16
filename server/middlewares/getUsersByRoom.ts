import { Request, Response, NextFunction } from 'express'
import { IRoomCode } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validators/index'
import {
  validateRoomCode,
  validateToken
} from '../services/validators/request/'

const validateBeforeGetUsers = async (
  req: Request<IRoomCode>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode } = req.params
  const token = req.cookies.token
  const roomValidator = new ValidatorFactory().createRoomValidator()
  try {
    console.log('validating before get users')
    validateToken(token, process.env.JWT_ROOM_SECRET)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetUsers }
