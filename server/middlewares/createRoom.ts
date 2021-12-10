import { IRoomBody } from '../routes/interfaces'
import { Request, Response, NextFunction } from 'express'
import { roomValidator } from '../services/validators'
import {
  validateRequestBody,
  validateRoomCode,
  validateUsername,
  validateSocketID
} from '../services/validators/request/'

const validateBeforeCreateRoom = async (
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
    await roomValidator.checkIfRoomAlreadyExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeCreateRoom }
