import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './users'
import { roomSlice } from './rooms'
import { errorSlice } from './error'
import { roomApi } from '../../services/api'
import { messagesSlice } from './messages'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  room: roomSlice.reducer,
  error: errorSlice.reducer,
  message: messagesSlice.reducer,
  [roomApi.reducerPath]: roomApi.reducer
})

export default rootReducer
