import Room from './Room'
import { IRoomRepositoryModel } from './RoomRepository'

interface IRoomMapper {
  toRoomEntity(roomModel: IRoomRepositoryModel): Room
  toRoomModel(room: Room): IRoomRepositoryModel
}

export default IRoomMapper
