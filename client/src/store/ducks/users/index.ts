import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../../lib/interfaces'

const initialState: User = {
  username: '',
  roomCode: '',
  socketID: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setRoomCode: (state, action: PayloadAction<string>) => {
      state.roomCode = action.payload
    },
    setSocketID: (state, action: PayloadAction<string>) => {
      state.socketID = action.payload
    }
  }
})

export const { setUsername, setRoomCode, setSocketID } = userSlice.actions
