import { IErrorMessage } from '../interfaces/IErrorMessage'

const ERR_USERNAME_MAX_LENGTH: IErrorMessage = {
  message: 'username length must be less than 25 characters',
  code: 10,
  status: 400
}
const ERR_INVALID_CHARACTERS: IErrorMessage = {
  message: 'The username has invalid characters',
  code: 20,
  status: 400
}
const ERR_INVALID_ROOM_CODE: IErrorMessage = {
  message: 'Invalid room code!',
  code: 30,
  status: 400
}
const ERR_MISSING_FIELDS: IErrorMessage = {
  message: 'One or more fields is missing!',
  code: 40,
  status: 400
}
const ERR_MISSING_BODY: IErrorMessage = {
  message: 'Missing body!',
  code: 50,
  status: 400
}

const ERR_TOO_MANY_FIELDS: IErrorMessage = {
  message: 'Too many fields!',
  code: 60,
  status: 400
}

const ERR_INVALID_SOCKET_ID: IErrorMessage = {
  message: 'Invalid socket ID!',
  code: 70,
  status: 400
}
const ERR_USERNAME_TAKEN: IErrorMessage = {
  message: 'Username already in use!',
  code: 80,
  status: 403
}
const ERR_ROOM_NOT_FOUND: IErrorMessage = {
  message: 'room not found',
  code: 90,
  status: 404
}
const ERR_ROOM_TAKEN: IErrorMessage = {
  message: 'Room code already in use!',
  code: 100,
  status: 403
}
const ERR_DB_VALIDATION: IErrorMessage = {
  message: 'Error on saving data!',
  code: 110,
  status: 500
}
const ERR_ROOM_NOT_EMPTY: IErrorMessage = {
  message: 'Room is not empty!',
  code: 120,
  status: 403
}
const ERR_USER_NOT_FOUND: IErrorMessage = {
  message: 'User not found!',
  code: 130,
  status: 404
}

const ERR_DEFAULT: IErrorMessage = {
  message: 'something went wrong',
  code: 500,
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
  ERR_DEFAULT
}
