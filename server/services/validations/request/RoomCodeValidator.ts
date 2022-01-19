import AppError from '../../errors/AppError'
import { IRoomCodeValidator } from '../interfaces'

class RoomCodeValidator implements IRoomCodeValidator {
  public checkEmptyField(roomCode: string): void {
    if (!roomCode) {
      throw new AppError('ERR_MISSING_FIELDS')
    }
  }

  public checkInvalid(roomCode: string): void {
    // test if roomCode is valid uuidv4
    const isValid = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    if (!isValid.test(roomCode)) {
      throw new AppError('ERR_INVALID_ROOM_CODE')
    }
  }

  public checkMaxLength(roomCode: string): void {
    if (roomCode.length > 36) {
      throw new AppError('ERR_INVALID_ROOM_CODE')
    }
  }
}

export { RoomCodeValidator }
