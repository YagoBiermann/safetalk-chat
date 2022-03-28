import IMessageDTO from './MessageDTO'
import RoomCode from '../RoomCode'
import TextMessage from './TextMessage'
import Username from '../../common/valueObjects/Username'
import MessageId from './MessageId'
import MESSAGE_TYPE from './MessageType'

class Message {
  private _id: MessageId
  private _username: Username
  private _roomCode: RoomCode
  private _textMessage: TextMessage
  private _messageType: MESSAGE_TYPE
  private _createdAt: number
  private _fileUrl?: string

  public constructor(messageDTO: IMessageDTO) {
    this._id = new MessageId(messageDTO.messageId) || new MessageId()
    this._username = new Username(messageDTO.username)
    this._roomCode = new RoomCode(messageDTO.roomCode)
    this._textMessage = new TextMessage(messageDTO.message)
    this._messageType = messageDTO.messageType
    this._createdAt = messageDTO.createdAt || Date.now()
    this._fileUrl = messageDTO.fileUrl
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

  public get content(): string {
    return this._textMessage.content
  }

  public get type(): MESSAGE_TYPE {
    return this._messageType
  }

  public get creationTime(): number {
    return this._createdAt
  }

  public get fileUrl(): string | null {
    if (this._fileUrl) {
      return this._fileUrl
    }
    return null
  }
}

export default Message
