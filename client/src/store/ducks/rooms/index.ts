import { FetchUsers, UsersOnRoom } from './../../../lib/interfaces/index'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { roomApi } from '../../../services/api'

interface Room {
  usersOnRoom: UsersOnRoom
  pending: boolean
}

const initialState: Room = {
  usersOnRoom: [{ username: '', id: '' }],
  pending: false
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setUsersOnRoom: (state, action: PayloadAction<UsersOnRoom>) => {
      state.usersOnRoom = action.payload
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

export const { setUsersOnRoom, resetPending, setPending } = roomSlice.actions
