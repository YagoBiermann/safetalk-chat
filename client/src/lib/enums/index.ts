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
  FRONTEND_URL = 'http://localhost:80/',
  NGINX_URL = 'http://safetalk_nginx:80/api/v2/'
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
