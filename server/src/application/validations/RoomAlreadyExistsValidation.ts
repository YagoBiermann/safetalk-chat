import RoomError from '../../domain/errors/models/RoomError'
import IValidation from '../ports/validations/Validation'
import { IRoomRepository } from '../../domain/models/room/RoomRepository'

class RoomAlreadyExistsValidation implements IValidation {
  constructor(private _roomRepository: IRoomRepository) {}

  public async validate(roomCode: string): Promise<null> {
    const roomExists = await this._roomRepository.getRoomByCode(roomCode)
    if (roomExists) {
      throw new RoomError('ERR_ROOM_TAKEN')
    }
    return null
  }
}

export default RoomAlreadyExistsValidation
