//Enums related to API calls
export enum ROUTES {
  CREATE_ROOM = 'rooms/create',
  JOIN_ROOM = 'rooms/join',
  DELETE_ROOM = 'rooms/', //:roomCode
  DELETE_USER = 'users/', //:socketID
  GET_USERS = 'users/', //:roomCode
  GET_ROOMS = 'rooms/',
  CREATE_USER = 'users/create'
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
