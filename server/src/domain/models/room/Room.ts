import IRoomDTO from './RoomDTO'
import RoomId from './RoomId'
import RoomCode from './RoomCode'
import Message from './message/Message'
import UserId from '../user/UserId'
import RoomError from '../../errors/models/RoomError'
import Entity from '../common/Entity'
import IMessageDTO from './message/MessageDTO'
import UserError from '../../errors/models/UserError'
import DomainEventPublisher from '../common/DomainEventPublisher'
import UserJoinedRoomEvent from './UserJoinedRoomEvent'

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

  public join(userId: string) {
    const fullRoom = this._users.size > 20
    const _userId = new UserId(userId).value
    if (fullRoom) {
      throw new RoomError('ERR_ROOM_FULL')
    }
    this._users.add(_userId)
  }

  public static generateRoomCode(): RoomCode {
    return new RoomCode()
  }

  public leave(userId: UserId) {
    const user = this._users.has(userId.value)
    this.assertArgumentNotNull(userId, new UserError('ERR_USER_NOT_FOUND'))
    this.assertStateTrue(user, new UserError('ERR_USER_NOT_FOUND'))
    this._users.delete(userId.value)
  }

  public addMessage(message: IMessageDTO) {
    this._messages.push(new Message(message))
  }
}

export default Room
