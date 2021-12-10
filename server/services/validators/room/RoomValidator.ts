import { IRoomRepository } from '../../../database/interfaces'
import { IUserRepository } from '../../../database/interfaces'
import { ERR_ROOM_NOT_FOUND, ERR_ROOM_TAKEN, ERR_ROOM_NOT_EMPTY } from '../../errors/constants'

class RoomValidator {
  constructor(
    private roomRepository: IRoomRepository,
    private userRepository: IUserRepository
  ) {}
  
  public async checkIfRoomAlreadyExists(roomCode: string): Promise<any> {
    const room = await this.roomRepository.getRoomByCode(roomCode)
    if (room) {
      throw ERR_ROOM_TAKEN
    }
  }

  public async checkIfRoomDoesNotExists(roomCode: string): Promise<any> {
    const room = await this.roomRepository.getRoomByCode(roomCode)
    if (!room) {
      throw ERR_ROOM_NOT_FOUND
    }
  }

  public async checkIfRoomIsNotEmpty(roomCode: string) {
    const room = await this.roomRepository.getRoomByCode(roomCode)
    const usersInRoom = await this.userRepository.getUsersByRoomID(room.id)
    if (usersInRoom.length > 0) {
      throw ERR_ROOM_NOT_EMPTY
    }
  }
}

export { RoomValidator }
