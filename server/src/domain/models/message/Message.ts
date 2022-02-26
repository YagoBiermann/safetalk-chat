import IMessageDTO from './MessageDTO'
import Identifier from '../../shared/valueObjects/Identifier'
import RoomCode from '../../shared/valueObjects/RoomCode'
import TextMessage from '../../shared/valueObjects/TextMessage'
import Username from '../../shared/valueObjects/Username'

class Message {
  private _id: Identifier
  private _username: Username
  private _roomCode: RoomCode
  private _textMessage: TextMessage
  private _type: string
  private _createdAt: number
  private _blob?: string

  private constructor() {}

  public get messageData() {
    return {
      id: this._id.value,
      username: this._username.value,
      roomCode: this._roomCode.value,
      message: this._textMessage.text,
      type: this._type,
      createdAt: this._createdAt,
      blob: this._blob
    }
  }

  public static create(message: IMessageDTO): Message {
    const messageInstance = new Message()

    messageInstance._id = new Identifier(message.id)
    messageInstance._username = new Username(message.username)
    messageInstance._roomCode = new RoomCode(message.roomCode)
    messageInstance._textMessage = new TextMessage(message.message)
    messageInstance._type = message.type
    messageInstance._createdAt = message.createdAt
    messageInstance._blob = message.blob

    return messageInstance
  }
}

export default Message
