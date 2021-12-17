import { combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './users'
import { roomSlice } from './rooms'
import { roomApi } from '../../services/api'
import { messagesSlice } from './messages'
import { appSlice } from './app'

const rootReducer = combineReducers({
  user: userSlice.reducer,
  room: roomSlice.reducer,
  app: appSlice.reducer,
  message: messagesSlice.reducer,
  [roomApi.reducerPath]: roomApi.reducer
})

export default rootReducer
