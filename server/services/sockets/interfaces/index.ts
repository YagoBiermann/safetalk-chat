export interface Message {
  id: string
  username: string
  roomCode: string
  message: string
  type: MESSAGE_TYPE
}

export enum MESSAGE_TYPE {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  FILE = 'FILE',
  AUDIO = 'AUDIO'
}

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