import { IAppErrorMessageModel } from '../ports/AppError'

export const errorMessages: IAppErrorMessageModel = {
  ERR_MESSAGE_MAX_LENGTH: {
    message: 'text message too long',
    code: 10
  },
  ERR_MESSAGE_MIN_LENGHT: {
    message: 'text message too short',
    code: 10
  },
  ERR_USERNAME_MAX_LENGTH: {
    message: 'username length must be less than 25 characters',
    code: 10
  },
  ERR_USERNAME_MIN_LENGTH: {
    message: 'username length must be greater than 3 characters',
    code: 10
  },
  ERR_INVALID_CHARACTERS: {
    message: 'The username has invalid characters',
    code: 10
  },
  ERR_USERNAME_TAKEN: {
    message: 'Username already in use',
    code: 30
  },
  ERR_USER_NOT_FOUND: {
    message: 'User not found',
    code: 40
  },
  ERR_USERNAME_NOT_PROVIDED: {
    message: 'Username not provided',
    code: 10
  },
  ERR_INVALID_ROOM_CODE: {
    message: 'Invalid room code',
    code: 10
  },
  ERR_ROOM_NOT_FOUND: {
    message: 'room not found',
    code: 40
  },
  ERR_ROOM_TAKEN: {
    message: 'Room code already in use',
    code: 30
  },
  ERR_ROOM_NOT_EMPTY: {
    message: 'Room is not empty',
    code: 30
  },
  ERR_SESSION_EXPIRED: {
    message: 'Session expired',
    code: 20
  },
  ERR_INVALID_ACCESS_KEY: {
    message: 'Invalid access key',
    code: 20
  },
  ERR_ACCESS_KEY_NOT_PROVIDED: {
    message: 'Access key not provided',
    code: 20
  },
  ERR_MALFORMED_KEY: {
    message: 'Malformed access key',
    code: 20
  },
  ERR_DEFAULT: {
    message: 'something went wrong',
    code: 99
  }
}
