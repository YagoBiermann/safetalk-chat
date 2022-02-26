import IRoomDTO from './RoomDTO'
import Identifier from '../../shared/valueObjects/Identifier'
import RoomCode from '../../shared/valueObjects/RoomCode'

class Room {
  private _id: Identifier
  private _roomCode: RoomCode
  private _messages: Array<string> = []
  private _users: Array<string> = []

  public constructor(room: IRoomDTO) {
    this._id = new Identifier(room.id)
    this._roomCode = new RoomCode(room.roomCode)
    this._messages = room.messages
    this._users = room.users
  }

  public get id(): string {
    return this._id.value
  }

  public get roomCode(): string {
    return this._roomCode.value
  }

  public get messages(): Array<string> {
    return this._messages
  }

  public get users(): Array<string> {
    return this._users
  }
}

export default Room
