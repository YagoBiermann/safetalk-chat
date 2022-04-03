import UserError from '../../domain/errors/models/UserError'
import IUserRepository from '../../domain/models/user/UserRepository'
import IValidation from '../ports/validations/Validation'

class UserAlreadyInRoomValidation implements IValidation {
  constructor(private user: IUserRepository) {}

  public async validate(userId: string): Promise<UserError> | null {
    const user = await this.user.getUserById(userId)
    if (user.room) {
      throw new UserError('ERR_USER_ALREADY_IN_ROOM')
    }
    return null
  }
}

export default UserAlreadyInRoomValidation
