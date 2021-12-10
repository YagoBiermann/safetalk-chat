import { IRoom, Room } from '../models/rooms'
import { IRoomRepository } from '../interfaces'

class RoomRepository implements IRoomRepository {
  public async createRoom(roomCode: string): Promise<IRoom> {
    console.info(`Creating room ${roomCode}`)
    return Room.create({ roomCode })
  }

  public async deleteRoom(roomCode: string): Promise<object> {
    console.info(`Deleting room ${roomCode}`)
    return Room.deleteOne({ roomCode }).exec()
  }

  public async getRoomByCode(roomCode: string): Promise<IRoom> {
    return Room.findOne({ roomCode }).exec()
  }

  public async getRooms(): Promise<IRoom[]> {
    return Room.find().select('roomCode').exec()
  }
}

export { RoomRepository }
