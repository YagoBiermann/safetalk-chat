import RoomError from '../../../domain/errors/models/RoomError'
import { IRoomRepository } from './../../../domain/models/room/RoomRepository'

class RoomAlreadyExistsValidator {
  constructor(private getRoom: IRoomRepository) {}

  public async validate(roomCode: string): Promise<Error | null> {
    const roomExists = await this.getRoom.getRoomByCode(roomCode)
    if (roomExists) {
      return new RoomError('ERR_ROOM_TAKEN')
    }
  }
}

export default RoomAlreadyExistsValidator
