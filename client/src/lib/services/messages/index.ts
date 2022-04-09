import socket from '../sockets'
import { MESSAGE_TYPE } from '../../enums'

interface sendMessageInputDTO {
  message: string
  messageType: MESSAGE_TYPE
  file?: {
    name: string
    url: string
    type: string
    size: number
  }
}

function sendMessage({ message, file, messageType }: sendMessageInputDTO) {
  const createdAt = Date.now()
  const assembledMessage = { message, messageType, file, createdAt }
  socket.emit('room:message', assembledMessage)
}

export { sendMessage }
