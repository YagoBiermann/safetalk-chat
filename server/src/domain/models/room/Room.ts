import IRoomDTO from './RoomDTO'
import RoomId from './RoomId'
import RoomCode from './RoomCode'
import Message from './message/Message'
import UserId from '../user/UserId'
import RoomError from '../../errors/models/RoomError'
import Entity from '../common/Entity'
import IMessageDTO from './message/MessageDTO'
import UserError from '../../errors/models/UserError'

class Room extends Entity {
  private _id: RoomId
  private _roomCode: RoomCode
  private _messages: Array<Message> = []
  private _users: Set<string> = new Set()

  public constructor(room: IRoomDTO) {
    super()
    this._id = new RoomId(room.id)
    this._roomCode = room.roomCode
      ? new RoomCode(room.roomCode)
      : Room.generateRoomCode()
  }

  public get id(): string {
    return this._id.value
  }

  public get roomCode(): string {
    return this._roomCode.value
  }

  public get messages(): Array<Message> {
    return this._messages
  }

  public get users(): Array<string> {
    return Array.from(this._users)
  }

  public connect(userId: string) {
    const isFull = this._users.size > 20
    const _userId = new UserId(userId).value
    if (isFull) {
      throw new RoomError('ERR_ROOM_FULL')
    }
    this._users.add(_userId)
  }

  public static generateRoomCode(): RoomCode {
    return new RoomCode()
  }

  public disconnect(userId: string) {
    this.assertArgumentNotNull(userId, new UserError('ERR_USER_NOT_FOUND'))
    const user = new UserId(userId).value
    const userInRoom = this._users.has(user)
    this.assertStateTrue(userInRoom, new UserError('ERR_USER_NOT_FOUND'))
    this._users.delete(user)
  }

  public addMessage(message: IMessageDTO) {
    this._messages.push(new Message(message))
  }
}

export default Room
