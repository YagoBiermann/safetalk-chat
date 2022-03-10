import { IRoomRepository } from './../../../domain/models/room/RoomRepository'
import RoomError from '../../../domain/errors/models/RoomError'
import IValidation from '../../ports/validations/Validation'

class RoomNotCreatedValidation implements IValidation {
  constructor(private room: IRoomRepository) {}

  public async validate(roomCode: string): Promise<RoomError> | null {
    const room = await this.room.getRoomByCode(roomCode)

    if (!room) {
      throw new RoomError('ERR_ROOM_NOT_FOUND')
    }
    return null
  }
}

export default RoomNotCreatedValidation
