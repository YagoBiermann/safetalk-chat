import { IMessageRepositoryModel } from '../../../domain/models/room/RoomRepository'
import MESSAGE_TYPE from '../../../domain/models/room/message/MessageType'
import Room from '../../../domain/models/room/Room'
import IRoomMapper from '../../../domain/models/room/RoomMapper'
import { IRoomRepositoryModel } from '../../../domain/models/room/RoomRepository'

class RoomMapper implements IRoomMapper {
  toRoomModel(room: Room): IRoomRepositoryModel {
    const messageToModel = room.messages.map(
      message =>
        ({
          _id: message.messageId,
          message: message.message,
          createdAt: message.createdAt,
          messageType: message.messageType,
          roomCode: message.roomCode,
          file: message.file,
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
        messageId: message._id,
        roomCode,
        username: message.username,
        message: message.message,
        messageType: MESSAGE_TYPE[message.messageType],
        createdAt: message.createdAt,
        file: message.file
      })
    )
    return room
  }
}

export default RoomMapper
