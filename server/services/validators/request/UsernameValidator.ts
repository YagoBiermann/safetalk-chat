import AppError from '../../errors/AppError'
import { IUsernameValidator } from '../interfaces'
class UsernameValidator implements IUsernameValidator {
  public checkEmptyField(username: string): void {
    if (!username) {
      throw new AppError('ERR_MISSING_FIELDS')
    }
  }

  public checkMaxLength(username: string): void {
    if (username.length > 25) {
      throw new AppError('ERR_USERNAME_MAX_LENGTH')
    }
  }

  public checkInvalid(username: string): void {
    if (/[^a-zA-ZçÇ_]+/g.test(username)) {
      throw new AppError('ERR_INVALID_CHARACTERS')
    }
  }
}

export { UsernameValidator }
