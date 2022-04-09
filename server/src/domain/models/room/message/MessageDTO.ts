import MESSAGE_TYPE from './MessageType'

interface IFileMetaData {
  name: string
  url: string
  type: string
  size: number
}

interface IMessageDTO {
  messageId?: string
  username: string
  roomCode: string
  messageType: MESSAGE_TYPE
  file?: IFileMetaData
  message: string
  createdAt: number
}

export { IFileMetaData }
export default IMessageDTO
