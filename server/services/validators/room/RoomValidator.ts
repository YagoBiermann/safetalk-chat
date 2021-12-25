import { IRoomRepository } from '../../../database/interfaces'
import { IUserRepository } from '../../../database/interfaces'
import AppError from '../../errors/AppError'

class RoomValidator {
  constructor(
    private roomRepository: IRoomRepository,
    private userRepository: IUserRepository
  ) {}
  
  public async checkIfRoomAlreadyExists(roomCode: string): Promise<any> {
    const room = await this.roomRepository.getRoomByCode(roomCode)
    if (room) {
      throw new AppError('ERR_ROOM_TAKEN')
    }
  }

  public async checkIfRoomDoesNotExists(roomCode: string): Promise<any> {
    const room = await this.roomRepository.getRoomByCode(roomCode)
    if (!room) {
      throw new AppError('ERR_ROOM_NOT_FOUND')
    }
  }

  public async checkIfRoomIsNotEmpty(roomCode: string) {
    const room = await this.roomRepository.getRoomByCode(roomCode)
    const usersInRoom = await this.userRepository.getUsersByRoomID(room.id)
    if (usersInRoom.length > 0) {
      throw new AppError('ERR_ROOM_NOT_EMPTY')
    }
  }
}

export { RoomValidator }
