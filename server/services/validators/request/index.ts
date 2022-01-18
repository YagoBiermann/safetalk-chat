import { ValidatorFactory } from '../index'
import jwt from 'jsonwebtoken'
import short from 'short-uuid'

const validateRequestBody = (req: Object) => {
  const validator = new ValidatorFactory().createBodyValidator()
  validator.checkMissingBody(req)
  validator.checkTooManyFields(req)
}

const validateRoomCode = (roomCode: string) => {
  const translatedRoomCode = short().toUUID(roomCode)
  const validator = new ValidatorFactory().createRoomCodeValidator()
  validator.checkEmptyField(translatedRoomCode)
  validator.checkInvalid(translatedRoomCode)
  validator.checkMaxLength(translatedRoomCode)
}

const validateUsername = (username: string) => {
  const validator = new ValidatorFactory().createUsernameValidator()
  validator.checkEmptyField(username)
  validator.checkInvalid(username)
  validator.checkMaxLength(username)
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
  validateToken
}
