import store from '../../store'
import { MESSAGE_TYPE } from '../enums'

// Success response from backend
export interface ApiResponse {
  message: string
}

export interface OnlineUsersDTO {
  users: Array<{ username: string; id: string }>
}

export interface OnlineUsersRedux extends Array<{ username: string; id: string }> {}

export interface FileName {
  fileName: string
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
  message: string
  type: MESSAGE_TYPE
}

export interface AudioMessage extends Omit<Message, 'message'> {
  audio: string
}
export interface FileMessage extends Omit<Message, 'message'> {
  filePreview: string
  message?: string
}

export type Recorder = {
  isRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: MediaRecorder | null
  audio: Blob | null
}

export type UseRecorder = {
  recorderState: Recorder
  startRecord: () => void
  cancelRecord: () => void
  finishRecord: () => void
}

// Dropzone file
export interface DropFile extends File {
  preview: string
}

// User data from redux
export interface UserRedux {
  username: string
  roomCode: string
}

// User data from backend
export interface UserDTO {
  _id: string
  username: string
  room: {
    _id: string
    roomCode: string
  }
  isAdmin: boolean
  isOnline: boolean
}

export interface CookieProps {
  [key: string]: string
}

// Dispatch
export type AppDispatch = typeof store.dispatch
// State
export type RootState = ReturnType<typeof store.getState>
