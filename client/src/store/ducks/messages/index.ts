import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message } from '../../../lib/interfaces'

const initialState: Message[] = []
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload)
    }
  }
})
export const { addMessage } = messagesSlice.actions
