import {
  ERR_MISSING_FIELDS,
  ERR_INVALID_ROOM_CODE
} from '../../errors/constants'

class RoomCodeValidator {
  public checkEmptyField(roomCode: string): void {
    if (!roomCode) {
      throw ERR_MISSING_FIELDS
    }
  }

  public checkInvalid(roomCode: string): void {
    const invalidRoomCode = /[^a-zA-Z0-9]+/g.test(roomCode)
    if (invalidRoomCode) {
      throw ERR_INVALID_ROOM_CODE
    }
  }

  public checkMaxLength(roomCode: string): void {
    if (roomCode.length > 25) {
      throw ERR_INVALID_ROOM_CODE
    }
  }
}

export { RoomCodeValidator }
