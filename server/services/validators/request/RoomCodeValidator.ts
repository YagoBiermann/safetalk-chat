import AppError from '../../errors/AppError'

class RoomCodeValidator {
  public checkEmptyField(roomCode: string): void {
    if (!roomCode) {
      throw new AppError('ERR_MISSING_FIELDS')
    }
  }

  public checkInvalid(roomCode: string): void {
    const invalidRoomCode = /[^a-zA-Z0-9]+/g.test(roomCode)
    if (invalidRoomCode) {
      throw new AppError('ERR_INVALID_ROOM_CODE')
    }
  }

  public checkMaxLength(roomCode: string): void {
    if (roomCode.length > 25) {
      throw new AppError('ERR_INVALID_ROOM_CODE')
    }
  }
}

export { RoomCodeValidator }
