import { Request, Response, NextFunction } from 'express'
import { IRoomBody } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validators/index'
import {
  validateRequestBody,
  validateRoomCode,
  validateUsername,
  validateSocketID,
  validateToken
} from '../services/validators/request/'

const validateBeforeJoinRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  const { socketID, username, roomCode } = req.body
  const token = req.cookies.token
  const roomValidator = new ValidatorFactory().createRoomValidator()

  try {
    console.log('validating before join room')
    validateToken(token, process.env.JWT_SECRET)
    validateRequestBody(req.body)
    validateSocketID(socketID)
    validateUsername(username)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeJoinRoom }
