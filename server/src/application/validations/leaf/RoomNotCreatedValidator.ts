import { IRoomRepository } from './../../../domain/models/room/RoomRepository'
import RoomError from '../../../domain/errors/models/RoomError'
import IValidator from '../../ports/validations/Validator'

class RoomNotCreatedValidator implements IValidator {
  constructor(private room: IRoomRepository) {}

  public async validate(roomCode: string): Promise<RoomError> | null {
    const room = await this.room.getRoomByCode(roomCode)

    if (!room) {
      return new RoomError('ERR_ROOM_NOT_FOUND')
    }
    return null
  }
}

export default RoomNotCreatedValidator
