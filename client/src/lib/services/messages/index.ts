import socket from '../sockets'
import { v4 as uuidv4 } from 'uuid'
import { Message, AudioMessage, FileMessage } from '../../interfaces'
import { MESSAGE_TYPE } from '../../enums'
import {
  addAudioMessage,
  addFileMessage,
  addTextMessage
} from '../../../store/ducks/messages'
import store from '../../../store'

socket.on('message:text', (message: Message) => {
  store.dispatch(addTextMessage(message))
})

const roomCode = store.getState().user.roomCode
const username = store.getState().user.username

const sendTextMessage = (message: string) => {
  const assembledMessage: Message = {
    id: uuidv4(),
    roomCode,
    username,
    type: MESSAGE_TYPE.TEXT,
    message
  }
  socket.emit('message:text', assembledMessage)
  store.dispatch(addTextMessage(assembledMessage))
}

const sendAudioMessage = (audio: string) => {
  const assembledMessage: AudioMessage = {
    id: uuidv4(),
    roomCode,
    username,
    type: MESSAGE_TYPE.AUDIO,
    audio
  }
  socket.emit('message:audio', assembledMessage)
  store.dispatch(addAudioMessage(assembledMessage))
}

const sendFileMessage = (
  filePreview: string,
  type: MESSAGE_TYPE.FILE | MESSAGE_TYPE.IMAGE | MESSAGE_TYPE.VIDEO,
  message?: string
) => {
  const assembledMessage: FileMessage = {
    id: uuidv4(),
    roomCode,
    username,
    type,
    filePreview,
    message
  }
  store.dispatch(addFileMessage(assembledMessage))
}

export { sendTextMessage, sendAudioMessage, sendFileMessage }
