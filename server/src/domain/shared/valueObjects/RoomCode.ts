import RoomError from '../../errors/models/RoomError'
import short from 'short-uuid'

class RoomCode {
  private readonly _roomCode: string

  constructor(value?: string) {
    if (value) {
      RoomCode._validate(value)
      this._roomCode = value
    }
    this._roomCode = short.generate()
  }

  get value(): string {
    return this._roomCode
  }

  private static _validate(value: string): Error | null {
    const isValid = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )

    // test if roomCode is valid uuidv4
    if (!isValid.test(value)) {
      return new RoomError('ERR_INVALID_ROOM_CODE')
    }

    if (value.length > 36) {
      return new RoomError('ERR_INVALID_ROOM_CODE')
    }
    return null
  }
}

export default RoomCode
