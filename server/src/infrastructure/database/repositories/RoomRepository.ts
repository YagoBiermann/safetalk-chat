import { ClientSession } from 'mongoose'
import { default as RoomEntity } from '../../../domain/models/room/Room'
import IRoomMapper from '../../../domain/models/room/RoomMapper'
import { IRoomRepository } from '../../../domain/models/room/RoomRepository'
import { Room } from '../models/rooms'

class RoomRepository implements IRoomRepository {
  constructor(private roomMapper: IRoomMapper) {}
  public async save(room: RoomEntity, session?: ClientSession): Promise<void> {
    const roomModel = this.roomMapper.toRoomModel(room)
    const roomExists = await this.getRoomById(room.id)

    if (roomExists) {
      await Room.findByIdAndUpdate(
        roomModel._id,
        { ...roomModel },
        { session }
      ).exec()
      console.log(`saving room ${room.roomCode}`)
      return
    }
    console.log(`Creating room ${room.roomCode}`)
    await new Room(roomModel).save({ session })
  }

  public async delete(roomId: string): Promise<void> {
    console.log(`Deleting room ${roomId}`)
    await Room.deleteOne({ roomId }).exec()
  }

  public async getRoomByCode(roomCode: string): Promise<RoomEntity> {
    const room = await Room.findOne({ roomCode }).exec()
    return room ? this.roomMapper.toRoomEntity(room) : null
  }

  public async getRoomById(roomId: string): Promise<RoomEntity> {
    const room = await Room.findById(roomId).exec()
    return room ? this.roomMapper.toRoomEntity(room) : null
  }
}

export default RoomRepository
