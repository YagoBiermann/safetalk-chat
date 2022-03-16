import { OnlineUsersRedux } from './../../../lib/interfaces/index'
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { roomApi } from '../../../lib/services/api'

interface Room {
  usersOnRoom: OnlineUsersRedux
  pending: boolean
}

const initialState: Room = {
  usersOnRoom: [{ username: '', userId: '' }],
  pending: false
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setUsersInRoom: (state, action: PayloadAction<OnlineUsersRedux>) => {
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

export const { setUsersInRoom, resetPending, setPending } = roomSlice.actions
