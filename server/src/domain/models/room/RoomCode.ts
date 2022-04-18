import RoomError from '../../errors/models/RoomError'
import short from 'short-uuid'
import ValueObject from '../common/ValueObject'

class RoomCode extends ValueObject {
  private readonly _roomCode: string

  constructor(value?: string) {
    super()
    if (value) {
      this.validate(value)
      this._roomCode = value
      return
    }
    this._roomCode = short.generate()
  }

  get value(): string {
    return this._roomCode
  }

  private validate(value: string): Error | null {
    try {
      const roomCode = short().toUUID(value)
      this.assertArgumentSuitableWithPattern(
        roomCode,
        new RegExp(
          /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        ),
        new RoomError('ERR_INVALID_ROOM_CODE')
      )

      this.assertArgumentStringLength(
        value,
        0,
        36,
        new RoomError('ERR_INVALID_ROOM_CODE')
      )
      return null
    } catch (error) {
      throw new RoomError('ERR_INVALID_ROOM_CODE')
    }
  }
}

export default RoomCode
