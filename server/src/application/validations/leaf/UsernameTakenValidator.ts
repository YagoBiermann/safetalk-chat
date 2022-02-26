import UserError from '../../../domain/errors/models/UserError'
import IUserRepository from '../../../domain/models/user/UserRepository'
import IValidator from '../../ports/validations/Validator'

class UsernameTakenValidator implements IValidator {
  constructor(private user: IUserRepository) {}

  public async validate(username: string): Promise<UserError> | null {
    const user = await this.user.getUserBy(username)
    if (user) {
      throw new UserError('ERR_USERNAME_TAKEN')
    }
    return null
  }
}

export default UsernameTakenValidator
