import UserError from '../../errors/models/UserError'

class Username {
  private readonly _username: string

  constructor(username: string) {
    Username._validate(username)
    this._username = username
  }

  get value(): string {
    return this._username
  }

  private static _validate(username: string): Error | null {
    if (username.length > 25) {
      throw new UserError('ERR_USERNAME_MAX_LENGTH')
    }

    if (username.length < 3) {
      throw new UserError('ERR_USERNAME_MIN_LENGTH')
    }

    if (/[^a-zA-ZçÇ_]+/g.test(username)) {
      throw new UserError('ERR_INVALID_CHARACTERS')
    }

    return null
  }
}

export default Username
