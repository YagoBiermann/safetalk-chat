import socket from '../sockets'
import { MESSAGE_TYPE } from '../../enums'

interface sendMessageInputDTO {
  message: string
  messageType: MESSAGE_TYPE
  fileUrl?: string
}

function sendMessage({ message, fileUrl, messageType }: sendMessageInputDTO) {
  const createdAt = Date.now()
  const assembledMessage = { message, messageType, fileUrl, createdAt }
  socket.emit('room:message', assembledMessage)
}

export { sendMessage }
