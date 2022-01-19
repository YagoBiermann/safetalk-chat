import { Request, Response, NextFunction } from 'express'
import { IRoomCode } from '../routes/interfaces'
import { ValidatorFactory } from '../services/validations/index'
import { validateRoomCode } from '../services/validations/request'

const validateBeforeGetUsers = async (
  req: Request<IRoomCode>,
  res: Response,
  next: NextFunction
) => {
  const { roomCode } = req.params
  const roomValidator = new ValidatorFactory().createRoomValidator()
  try {
    console.log('validating before get users')
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeGetUsers }
