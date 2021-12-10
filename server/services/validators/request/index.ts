import { BodyValidator } from './BodyValidator'
import { RoomCodeValidator } from './RoomCodeValidator'
import { SocketIDValidator } from './SocketIDValidator'
import { UsernameValidator } from './UsernameValidator'

const validateRequestBody = (req: Object) => {
  const validator = new BodyValidator()
  validator.checkMissingBody(req)
  validator.checkTooManyFields(req)
}

const validateRoomCode = (roomCode: string) => {
  const validator = new RoomCodeValidator()
  validator.checkEmptyField(roomCode)
  validator.checkInvalid(roomCode)
}

const validateUsername = (username: string) => {
  const validator = new UsernameValidator()
  validator.checkEmptyField(username)
  validator.checkInvalid(username)
  validator.checkMaxLength(username)
}

const validateSocketID = (socketID: string) => {
  const validator = new SocketIDValidator()
  validator.checkEmptyField(socketID)
  validator.checkMaxLength(socketID)
}

export {
  validateRequestBody,
  validateRoomCode,
  validateUsername,
  validateSocketID
}
