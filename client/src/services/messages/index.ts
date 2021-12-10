import socket from '../sockets'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { Message } from '../../lib/interfaces'
import { RootState, AppDispatch } from '../../lib/interfaces'
import { MESSAGE_TYPE } from '../../lib/enums'
import { addMessage } from '../../store/ducks/messages'
import store from '../../store'

socket.on('message', (message: Message) => {
  store.dispatch(addMessage(message))
})

const sendMessage = createAsyncThunk<
  void,
  { data: string | Blob; type: MESSAGE_TYPE },
  { state: RootState; dispatch: AppDispatch }
>('messages/sendMessage', (message, thunkAPI) => {
  const roomCode = thunkAPI.getState().user.roomCode
  const username = thunkAPI.getState().user.username
  const assembledMessage: Message = {
    id: uuidv4(),
    roomCode,
    username,
    type: message.type,
    data: message.data
  }
  socket.emit('message', assembledMessage)
  thunkAPI.dispatch(addMessage(assembledMessage))
})

export { sendMessage }
