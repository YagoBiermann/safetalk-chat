import { ValidatorFactory } from '../index'
import jwt from 'jsonwebtoken'

const validateRequestBody = (req: Object) => {
  const validator = new ValidatorFactory().createBodyValidator()
  validator.checkMissingBody(req)
  validator.checkTooManyFields(req)
}

const validateRoomCode = (roomCode: string) => {
  const validator = new ValidatorFactory().createRoomCodeValidator()
  validator.checkEmptyField(roomCode)
  validator.checkInvalid(roomCode)
}

const validateUsername = (username: string) => {
  const validator = new ValidatorFactory().createUsernameValidator()
  validator.checkEmptyField(username)
  validator.checkInvalid(username)
  validator.checkMaxLength(username)
}

const validateSocketID = (socketID: string) => {
  const validator = new ValidatorFactory().createSocketIDValidator()
  validator.checkEmptyField(socketID)
  validator.checkMaxLength(socketID)
}

const validateToken = (header: string, secret: string) => {
  const validator = new ValidatorFactory().createHeaderValidator()
  validator.checkAuthorization(header)
  const token = header.split(' ')[1]
  jwt.verify(token, secret)
}

export {
  validateRequestBody,
  validateRoomCode,
  validateUsername,
  validateSocketID,
  validateToken
}
