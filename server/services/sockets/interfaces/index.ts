export interface IMessage {
  id: string
  username: string
  roomCode: string
  data: string | Blob
  type: MESSAGE_TYPE
}

export enum MESSAGE_TYPE {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  FILE = 'FILE',
  AUDIO = 'AUDIO'
}