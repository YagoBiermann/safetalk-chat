import UserError from '../../../errors/models/UserError'
import ValueObject from '../ValueObject'

class Username extends ValueObject {
  private readonly _username: string

  constructor(username: string) {
    super()
    this.validate(username)
    this._username = username
  }

  get value(): string {
    return this._username
  }

  private validate(username: string): Error | null {
    this.assertArgumentStringLength(
      username,
      3,
      20,
      new UserError('ERR_USERNAME_LENGTH')
    )

    this.assertArgumentSuitableWithPattern(
      username,
      new RegExp(/^[a-zA-Z0-9_-]*$/),
      new UserError('ERR_INVALID_CHARACTERS')
    )

    return null
  }
}

export default Username
