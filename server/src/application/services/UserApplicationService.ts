import IUserRepository from '../../domain/models/user/UserRepository'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import User from '../../domain/models/user/User'
import IValidation from '../ports/validations/Validation'
import {
  ICreateUserInputDTO,
  ICreateUserOutputDTO,
  IUserApplicationService
} from '../ports/services/UserApplicationService'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import UserError from '../../domain/errors/models/UserError'

class UserApplicationService
  extends ArgumentAssertion
  implements IUserApplicationService
{
  constructor(
    private userRepository: IUserRepository,
    private authentication: IAuthenticationService,
    private userValidation: IValidation
  ) {
    super()
  }
  public async createUser({
    username,
    userId
  }: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
    this.assertArgumentNotNull(
      username,
      new UserError('ERR_USERNAME_NOT_PROVIDED')
    )
    await this.userValidation.validate(username)

    if (userId) {
      await this.userRepository.delete(userId)
    }

    const user = new User({
      id: null,
      username,
      isOnline: false,
      room: null
    })

    await this.userRepository.save(user)

    const accessKey = this.authentication.generateAccessKey(
      user.id,
      process.env.JWT_SECRET,
      600
    )

    return { userId: user.id, accessKey }
  }
}

export default UserApplicationService
