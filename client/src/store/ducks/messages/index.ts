import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AudioMessage, FileMessage, Message } from '../../../lib/interfaces'

const initialState: Array<Message | AudioMessage | FileMessage> = []
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    addTextMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload)
    },
    addAudioMessage: (state, action: PayloadAction<AudioMessage>) => {
      state.push(action.payload)
    },
    addFileMessage: (state, action: PayloadAction<FileMessage>) => {
      state.push(action.payload)
    }
  }
})
export const { addTextMessage, addAudioMessage, addFileMessage } =
  messagesSlice.actions
