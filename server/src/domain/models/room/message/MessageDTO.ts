import MessageType from './MessageType'

interface IMessageDTO {
  id?: string
  username: string
  roomCode: string
  message: string
  messageType: MessageType
  createdAt: number
  fileURL?: string
}

export default IMessageDTO
