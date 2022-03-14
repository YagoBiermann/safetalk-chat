import { IMessageRepositoryModel } from '../../../domain/models/room/RoomRepository'
import MessageType from '../../../domain/models/room/message/MessageType'
import Room from '../../../domain/models/room/Room'
import IRoomMapper from '../../../domain/models/room/RoomMapper'
import { IRoomRepositoryModel } from '../../../domain/models/room/RoomRepository'

class RoomMapper implements IRoomMapper {
  toRoomModel(room: Room): IRoomRepositoryModel {
    const messageToModel = room.messages.map(
      message =>
        ({
          _id: message.id,
          message: message.text,
          createdAt: message.creationTime,
          messageType: message.type,
          roomCode: message.roomCode,
          fileURL: message.pathToFile,
          username: message.username
        } as IMessageRepositoryModel)
    )

    return {
      _id: room.id,
      roomCode: room.roomCode,
      messages: messageToModel,
      users: room.users
    }
  }
  toRoomEntity(roomModel: IRoomRepositoryModel): Room {
    const { roomCode, _id, users, messages } = roomModel

    const room = new Room({
      roomCode,
      id: _id
    })
    users.forEach(user => room.connect(user))
    messages.forEach(message =>
      room.addMessage({
        id: message._id,
        roomCode,
        username: message.username,
        message: message.message,
        messageType: MessageType[message.messageType],
        createdAt: message.createdAt,
        fileURL: message.fileURL
      })
    )
    return room
  }
}

export default RoomMapper
