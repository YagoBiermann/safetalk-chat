import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message } from '../../../lib/interfaces'

const initialState: { messages: Array<Message> } = { messages: [] }
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    hydrateMessages: (state, action: PayloadAction<Array<Message>>) => {
      state.messages.push(...action.payload)
    }
  }
})
export const { addMessage, hydrateMessages } = messagesSlice.actions
