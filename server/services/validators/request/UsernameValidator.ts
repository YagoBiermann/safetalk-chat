import {
  ERR_MISSING_FIELDS,
  ERR_USERNAME_MAX_LENGTH,
  ERR_INVALID_CHARACTERS
} from '../../errors/constants'

class UsernameValidator {
  public checkEmptyField(username: string): void {
    if (!username) {
      throw ERR_MISSING_FIELDS
    }
  }

  public checkMaxLength(username: string): void {
    if (username.length > 25) {
      throw ERR_USERNAME_MAX_LENGTH
    }
  }

  public checkInvalid(username: string): void {
    if (/[^a-zA-ZçÇ_]+/g.test(username)) {
      throw ERR_INVALID_CHARACTERS
    }
  }
}

export { UsernameValidator }
