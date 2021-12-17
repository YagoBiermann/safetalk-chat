export interface Message {
  id: string
  username: string
  roomCode: string
  message: string
  type: MESSAGE_TYPE
}

export interface AudioMessage extends Omit<Message, 'message'> {
  audio: Blob | string | Buffer
}
export interface FileMessage extends Omit<Message, 'message'> {
  file: Blob | Buffer | string
  message?: string
}

export enum MESSAGE_TYPE {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  FILE = 'FILE',
  AUDIO = 'AUDIO'
}
