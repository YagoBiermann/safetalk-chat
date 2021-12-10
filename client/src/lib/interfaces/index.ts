import store from '../../store'
import { MESSAGE_TYPE } from '../enums'

// Error messages from backend
export interface ErrorMessage {
  message: string
  code?: number
}

// Success response from backend
export interface SuccessMessage {
  message: string
}

export interface Username {
  username: string
}

export interface RoomCode {
  roomCode: string
}

export interface SocketID {
  socketID: string
}

export interface Message {
  id: string
  username: string
  roomCode: string
  data: string | Blob
  type: MESSAGE_TYPE
}

export type Recorder = {
  isRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: MediaRecorder | null
  audio: string | null
}

export type UseRecorder = {
  recorderState: Recorder
  startRecord: () => void
  cancelRecord: () => void
  finishRecord: () => void
}

// User data
export interface User extends Username, RoomCode, SocketID {}

// Dispatch
export type AppDispatch = typeof store.dispatch
// State
export type RootState = ReturnType<typeof store.getState>
