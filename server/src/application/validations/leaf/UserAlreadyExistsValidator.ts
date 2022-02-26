import UserError from '../../../domain/errors/models/UserError'
import IUserRepository from '../../../domain/models/user/UserRepository'
import IValidator from '../../ports/validations/Validator'

class UserAlreadyExistsValidator implements IValidator {
  constructor(private user: IUserRepository) {}

  public async validate(userId: string): Promise<UserError> | null {
    const user = await this.user.getUserById(userId)
    if (user) {
      return new UserError('ERR_USERNAME_TAKEN')
    }
    return null
  }
}

export default UserAlreadyExistsValidator
