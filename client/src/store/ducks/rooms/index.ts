import {
  createSlice,
  isAnyOf,
  PayloadAction
} from '@reduxjs/toolkit'
import { roomApi } from '../../../services/api'

interface Room {
  rooms: string[]
  usersByRoom: string[]
  pending: boolean
}

const initialState: Room = {
  rooms: [],
  usersByRoom: [],
  pending: false
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<string[]>) => {
      state.rooms = action.payload
    },
    setUsersByRoom: (state, action: PayloadAction<string[]>) => {
      state.usersByRoom = action.payload
    },
    resetPending: state => {
      state.pending = false
    },
    setPending: state => {
      state.pending = true
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        roomApi.endpoints.createRoom.matchPending,
        roomApi.endpoints.joinRoom.matchPending
      ),
      state => {
        state.pending = true
      }
    ),
      builder.addMatcher(
        isAnyOf(
          roomApi.endpoints.createRoom.matchFulfilled,
          roomApi.endpoints.joinRoom.matchFulfilled,
          roomApi.endpoints.createRoom.matchRejected,
          roomApi.endpoints.joinRoom.matchRejected
        ),
        state => {
          state.pending = false
        }
      )
  }
})

export const { setRooms, setUsersByRoom, resetPending, setPending } =
  roomSlice.actions
