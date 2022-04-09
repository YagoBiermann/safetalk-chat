import UserError from '../../domain/errors/models/UserError'
import IUserRepository from '../../domain/models/user/UserRepository'
import IValidation from '../ports/validations/Validation'

class UsernameTakenValidation implements IValidation {
  constructor(private user: IUserRepository) {}

  public async validate(username: string): Promise<UserError> | null {
    const user = await this.user.getUserBy(username)
    if (user) {
      throw new UserError('ERR_USERNAME_TAKEN')
    }
    return null
  }
}

export default UsernameTakenValidation
