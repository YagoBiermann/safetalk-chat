import Room from '../../../src/domain/models/room/Room'
import { IRoomRepository } from '../../../src/domain/models/room/RoomRepository'

class RoomRepositoryMock implements IRoomRepository {
  constructor() {}

  public async save(room: any, session?: any): Promise<void> {
    Promise.resolve()
  }

  public async delete(roomId: string): Promise<void> {
    Promise.resolve()
  }

  public async getRoomByCode(roomCode: string): Promise<Room> {
    const room = new Room({ id: null, roomCode })
    return Promise.resolve(room)
  }

  public async getRoomById(roomId: string): Promise<Room> {
    const room = new Room({ id: null, roomCode: Room.generateRoomCode().value })
    return Promise.resolve(room)
  }
}

export default RoomRepositoryMock
