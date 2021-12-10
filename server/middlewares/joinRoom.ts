import { Request, Response, NextFunction } from 'express'
import { IRoomBody } from '../routes/interfaces'
import { roomValidator } from '../services/validators/index'
import { userValidator } from '../services/validators/index'
import {
  validateRequestBody,
  validateRoomCode,
  validateUsername,
  validateSocketID
} from '../services/validators/request/'

const validateBeforeJoinRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { socketID, username, roomCode } = req.body
    validateRequestBody(req.body)
    validateSocketID(socketID)
    validateUsername(username)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomDoesNotExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeJoinRoom }
