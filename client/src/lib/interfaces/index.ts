import store from '../../store'
import { MESSAGE_TYPE } from '../enums'

// Success response from backend
export interface ApiResponse {
  message: string
}

export interface OnlineUsersDTO {
  users: Array<{
    userId: string
    username: string
    roomCode: string
    roomId: string
    isOnline: boolean
  }>
}

export interface OnlineUsersRedux
  extends Array<{ username: string; userId: string }> {}

export interface UploadFileResponse {
  fileUrl: string
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
  messageId: string
  username: string
  roomCode: string
  messageType: MESSAGE_TYPE
  fileUrl: string
  message: string
  createdAt: number
}

export type Recorder = {
  isRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: MediaRecorder | null
  audio: File | null
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
  userId: string
  username: string
  room: string
  roomCode: string
  isOnline: boolean
  messages: Array<Message>
}

export interface CookieProps {
  [key: string]: string
}

// Dispatch
export type AppDispatch = typeof store.dispatch
// State
export type RootState = ReturnType<typeof store.getState>
