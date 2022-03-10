import IUserRepository from '../../../domain/models/user/UserRepository'
import { IRoomRepository } from './../../../domain/models/room/RoomRepository'
import RoomError from '../../../domain/errors/models/RoomError'
import IValidation from '../../ports/validations/Validation'

class RoomEmptyValidation implements IValidation {
  constructor(
    private room: IRoomRepository,
    private users: IUserRepository
  ) {}

  public async validate(roomCode: string): Promise<RoomError> | null {
    const room = await this.room.getRoomByCode(roomCode)
    const usersInRoom = await this.users.getAllUsernamesFrom(room.id)

    if (usersInRoom.length > 0) {
      throw new RoomError('ERR_ROOM_NOT_EMPTY')
    }
    return null
  }
}

export default RoomEmptyValidation
