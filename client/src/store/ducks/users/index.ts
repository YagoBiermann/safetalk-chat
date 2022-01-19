import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserRedux } from '../../../lib/interfaces'

const initialState: UserRedux = {
  username: '',
  roomCode: ''
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
    }
  }
})

export const { setUsername, setRoomCode } = userSlice.actions
