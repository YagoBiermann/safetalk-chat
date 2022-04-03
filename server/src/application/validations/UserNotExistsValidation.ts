import UserError from '../../domain/errors/models/UserError'
import IUserRepository from '../../domain/models/user/UserRepository'
import IValidation from '../ports/validations/Validation'

class UserNotExistsValidation implements IValidation {
  constructor(private user: IUserRepository) {}

  public async validate(userId: string): Promise<UserError> | null {
    const user = await this.user.getUserById(userId)
    if (!user) {
      throw new UserError('ERR_USER_NOT_FOUND')
    }
    return null
  }
}

export default UserNotExistsValidation
