import AppError from "../../errors/AppError"
class SocketIDValidator {
  public checkMaxLength(socketID: string): void {
    if (socketID.length > 25) {
      throw new AppError('ERR_INVALID_SOCKET_ID')
    }
  }

  public checkEmptyField(socketID: string): void {
    if (!socketID) {
      throw new AppError('ERR_MISSING_FIELDS')
    }
  }
}

export { SocketIDValidator }
