import IRoomRepositoryModel from '../../../domain/models/room/RoomRepository'
import { IRoomRepository } from '../../../domain/models/room/RoomRepository'
import { Room } from '../models/rooms'

class RoomRepository implements IRoomRepository {
  public async createRoom(roomCode: string): Promise<IRoomRepositoryModel> {
    console.log(`Creating room ${roomCode}`)
    return Room.create({ roomCode })
  }

  public async deleteRoom(roomCode: string): Promise<object> {
    console.log(`Deleting room ${roomCode}`)
    return Room.deleteOne({ roomCode }).exec()
  }

  public async getRoomByCode(roomCode: string): Promise<IRoomRepositoryModel> {
    return Room.findOne({ roomCode }).exec()
  }

  public async getRoomById(id: string): Promise<IRoomRepositoryModel> {
    return Room.findById({ id }).exec()
  }

  public async getAllUsers(roomId: string): Promise<IRoomRepositoryModel> {
    return Room.findById(roomId, 'users').exec()
  }
}

export default RoomRepository
