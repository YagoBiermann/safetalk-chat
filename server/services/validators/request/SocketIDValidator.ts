import {
  ERR_MISSING_FIELDS,
  ERR_INVALID_SOCKET_ID
} from '../../errors/constants'

class SocketIDValidator {
  public checkMaxLength(socketID: string): void {
    if (socketID.length > 25) {
      throw ERR_INVALID_SOCKET_ID
    }
  }

  public checkEmptyField(socketID: string): void {
    if (!socketID) {
      throw ERR_MISSING_FIELDS
    }
  }
}

export { SocketIDValidator }
