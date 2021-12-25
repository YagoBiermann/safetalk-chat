import { IErrorMessage } from '../interfaces/IErrorMessage'

const ERR_USERNAME_MAX_LENGTH: IErrorMessage = {
  message: 'username length must be less than 25 characters',
  status: 400
}
const ERR_INVALID_CHARACTERS: IErrorMessage = {
  message: 'The username has invalid characters',
  status: 400
}
const ERR_INVALID_ROOM_CODE: IErrorMessage = {
  message: 'Invalid room code',
  status: 400
}
const ERR_MISSING_FIELDS: IErrorMessage = {
  message: 'One or more fields is missing',
  status: 400
}
const ERR_MISSING_BODY: IErrorMessage = {
  message: 'Missing body',
  status: 400
}

const ERR_TOO_MANY_FIELDS: IErrorMessage = {
  message: 'Too many fields',
  status: 400
}

const ERR_INVALID_SOCKET_ID: IErrorMessage = {
  message: 'Invalid socket ID',

  status: 400
}
const ERR_USERNAME_TAKEN: IErrorMessage = {
  message: 'Username already in use',
  status: 403
}
const ERR_ROOM_NOT_FOUND: IErrorMessage = {
  message: 'room not found',
  status: 404
}
const ERR_ROOM_TAKEN: IErrorMessage = {
  message: 'Room code already in use',
  status: 403
}
const ERR_DB_VALIDATION: IErrorMessage = {
  message: 'Error on saving data',
  status: 500
}
const ERR_ROOM_NOT_EMPTY: IErrorMessage = {
  message: 'Room is not empty',
  status: 403
}
const ERR_USER_NOT_FOUND: IErrorMessage = {
  message: 'User not found',
  status: 404
}

const ERR_INVALID_RANGE: IErrorMessage = {
  message: 'Range is not valid',
  status: 400
}

const ERR_RANGE_NOT_FOUND: IErrorMessage = {
  message: 'Range not found',
  status: 400
}

const ERR_MISSING_CONTENT_TYPE: IErrorMessage = {
  message: 'Missing content type',
  status: 400
}

const ERR_CONTENT_TYPE_NOT_ALLOWED: IErrorMessage = {
  message: 'content type not allowed',
  status: 406
}

const ERR_FILE_NOT_FOUND: IErrorMessage = {
  message: 'File not found',
  status: 404
}

const ERR_FILE_NOT_ALLOWED: IErrorMessage = {
  message: 'File not allowed',
  status: 406
}

const ERR_DEFAULT: IErrorMessage = {
  message: 'something went wrong',
  status: 500
}

export {
  ERR_USERNAME_MAX_LENGTH,
  ERR_INVALID_CHARACTERS,
  ERR_INVALID_ROOM_CODE,
  ERR_MISSING_FIELDS,
  ERR_MISSING_BODY,
  ERR_TOO_MANY_FIELDS,
  ERR_INVALID_SOCKET_ID,
  ERR_USERNAME_TAKEN,
  ERR_ROOM_NOT_FOUND,
  ERR_ROOM_TAKEN,
  ERR_DB_VALIDATION,
  ERR_ROOM_NOT_EMPTY,
  ERR_USER_NOT_FOUND,
  ERR_INVALID_RANGE,
  ERR_RANGE_NOT_FOUND,
  ERR_MISSING_CONTENT_TYPE,
  ERR_CONTENT_TYPE_NOT_ALLOWED,
  ERR_FILE_NOT_FOUND,
  ERR_FILE_NOT_ALLOWED,
  ERR_DEFAULT
}
