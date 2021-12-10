import { Request, Response, NextFunction } from 'express'
import { IRoomCode } from '../routes/interfaces'
import { roomValidator } from '../services/validators/index'
import { validateRoomCode } from '../services/validators/request/'

const validateBeforeGetUsers = async (
  req: Request<IRoomCode>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomCode } = req.params
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomDoesNotExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetUsers }
