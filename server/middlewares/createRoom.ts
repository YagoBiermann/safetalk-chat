import { IRoomBody } from '../routes/interfaces'
import { Request, Response, NextFunction } from 'express'
import { ValidatorFactory } from '../services/validators'
import {
  validateRequestBody,
  validateRoomCode,
  validateUsername,
  validateToken
} from '../services/validators/request/'

const validateBeforeCreateRoom = async (
  req: Request<IRoomBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, roomCode } = req.body
  const token = req.cookies.token
  const roomValidator = new ValidatorFactory().createRoomValidator()

  try {
    console.log('validating before create room')
    validateToken(token, process.env.JWT_SECRET)
    validateRequestBody(req.body)
    validateUsername(username)
    validateRoomCode(roomCode)
    await roomValidator.checkIfRoomAlreadyExists(roomCode)
    next()
  } catch (error) {
    next(error)
  }
}

export { validateBeforeCreateRoom }
