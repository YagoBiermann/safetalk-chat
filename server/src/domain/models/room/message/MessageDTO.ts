import MESSAGE_TYPE from './MessageType'

interface IMessageDTO {
  messageId?: string
  username: string
  roomCode: string
  messageType: MESSAGE_TYPE
  fileUrl?: string
  message: string
  createdAt: number
}

export default IMessageDTO
