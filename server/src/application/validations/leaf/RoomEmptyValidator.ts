import IUserRepository from '../../../domain/models/user/UserRepository'
import { IRoomRepository } from './../../../domain/models/room/RoomRepository'
import RoomError from '../../../domain/errors/models/RoomError'
import IValidator from '../../ports/validations/Validator'

class RoomEmptyValidator implements IValidator {
  constructor(
    private room: IRoomRepository,
    private users: IUserRepository
  ) {}

  public async validate(roomCode: string): Promise<RoomError> | null {
    const room = await this.room.getRoomByCode(roomCode)
    const usersInRoom = await this.users.getAllUsers(room._id)

    if (usersInRoom.length > 0) {
      return new RoomError('ERR_ROOM_NOT_EMPTY')
    }
    return null
  }
}

export default RoomEmptyValidator
