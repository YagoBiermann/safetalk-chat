import { ValidatorFactory } from '../index'
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

export { validateRequestBody, validateRoomCode, validateUsername }
