import { IErrorMessage } from '../interfaces'

export const errorMessages: IErrorMessage = {
  ERR_USERNAME_MAX_LENGTH: {
    message: 'username length must be less than 25 characters',
    status: 400
  },
  ERR_INVALID_CHARACTERS: {
    message: 'The username has invalid characters',
    status: 400
  },
  ERR_INVALID_ROOM_CODE: {
    message: 'Invalid room code',
    status: 400
  },
  ERR_MISSING_FIELDS: {
    message: 'One or more fields is missing',
    status: 400
  },
  ERR_MISSING_BODY: {
    message: 'Missing body',
    status: 400
  },
  ERR_TOO_MANY_FIELDS: {
    message: 'Too many fields',
    status: 400
  },
  ERR_INVALID_SOCKET_ID: {
    message: 'Invalid socket ID',
    status: 400
  },
  ERR_USERNAME_TAKEN: {
    message: 'Username already in use',
    status: 403
  },
  ERR_ROOM_NOT_FOUND: {
    message: 'room not found',
    status: 404
  },
  ERR_ROOM_TAKEN: {
    message: 'Room code already in use',
    status: 403
  },
  ERR_DB_VALIDATION: {
    message: 'Error on saving data',
    status: 500
  },
  ERR_ROOM_NOT_EMPTY: {
    message: 'Room is not empty',
    status: 403
  },
  ERR_USER_NOT_FOUND: {
    message: 'User not found',
    status: 404
  },
  ERR_INVALID_RANGE: {
    message: 'Range is not valid',
    status: 400
  },
  ERR_RANGE_NOT_FOUND: {
    message: 'Range not found',
    status: 400
  },
  ERR_MISSING_CONTENT_TYPE: {
    message: 'Missing content type',
    status: 400
  },
  ERR_CONTENT_TYPE_NOT_ALLOWED: {
    message: 'content type not allowed',
    status: 406
  },
  ERR_FILE_NOT_FOUND: {
    message: 'File not found',
    status: 404
  },
  ERR_FILE_NOT_ALLOWED: {
    message: 'File not allowed',
    status: 406
  },
  ERR_MISSING_TOKEN: {
    message: 'Missing token',
    status: 400
  },
  ERR_INVALID_TOKEN: {
    message: 'Invalid token',
    status: 401
  },
  ERR_MALFORMED_TOKEN: {
    message: 'Malformed token',
    status: 401
  },
  ERR_DEFAULT: {
    message: 'something went wrong',
    status: 500
  }
}
