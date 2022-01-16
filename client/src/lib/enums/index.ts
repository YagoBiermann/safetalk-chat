//Enums related to API calls
export enum ROUTES {
  CREATE_ROOM = 'rooms/create',
  JOIN_ROOM = 'rooms/join',
  DELETE_ROOM = 'rooms/', //:roomCode
  DELETE_USER = 'users/', //:socketID
  GET_USERS = 'users/', //:roomCode
  CREATE_USER = 'users/create',
}

export enum MESSAGE_TYPE {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  FILE = 'FILE',
  AUDIO = 'AUDIO'
}

export enum SOCKET_EVENTS {}

export enum ENDPOINTS {
  BACKEND_URL = 'http://localhost:80/api/v2/',
  FRONTEND_URL = 'http://localhost:80/'
}

//accepted file types for upload
export const acceptedTypes = `
  image/jpeg, 
  image/png, 
  video/webm, 
  video/ogg, 
  video/quicktime,
  video/mp4, 
  video/wmv, 
  video/avi, 
  video/mov,
  audio/mp3,
  audio/mp4, 
  text/plain, 
  application/pdf, 
  application/zip, 
  application/vnd.openxmlformats-officedocument.wordprocessingml.document, 
  application/msword, application/vnd.openxmlformats-officedocument.presentationml.presentation, 
  application/vnd.ms-powerpoint
`