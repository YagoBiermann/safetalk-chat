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
    console.log(`validating token: ${token}`)
    validateToken(token, process.env.JWT_SECRET)
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
