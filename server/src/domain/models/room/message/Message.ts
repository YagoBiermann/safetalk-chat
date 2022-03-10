import IMessageDTO from './MessageDTO'
import RoomCode from '../RoomCode'
import TextMessage from './TextMessage'
import Username from '../../common/valueObjects/Username'
import MessageId from './MessageId'
import MessageType from './MessageType'

class Message {
  private _id: MessageId
  private _username: Username
  private _roomCode: RoomCode
  private _textMessage: TextMessage
  private _messageType: MessageType
  private _createdAt: number
  private _fileURL?: string

  public constructor(messageDTO: IMessageDTO) {
    this._id = new MessageId(messageDTO.id) || new MessageId()
    this._username = new Username(messageDTO.username)
    this._roomCode = new RoomCode(messageDTO.roomCode)
    this._textMessage = new TextMessage(messageDTO.message)
    this._messageType = messageDTO.messageType
    this._createdAt = messageDTO.createdAt || Date.now()
    this._fileURL = messageDTO.fileURL
  }

  public get id(): string {
    return this._id.value
  }

  public get username(): string {
    return this._username.value
  }

  public get roomCode(): string {
    return this._roomCode.value
  }

  public get text(): string {
    return this._textMessage.content
  }

  public get type(): MessageType {
    return this._messageType
  }

  public get creationTime(): number {
    return this._createdAt
  }

  public get pathToFile(): string | null {
    if (this._fileURL) {
      return this._fileURL
    }
    return null
  }
}

export default Message
