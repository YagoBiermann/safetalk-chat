import UserError from '../../domain/errors/models/UserError'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import User from '../../domain/models/user/User'
import IUserRepository from '../../domain/models/user/UserRepository'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import {
  ICreateUserInputDTO,
  ICreateUserOutputDTO
} from '../ports/services/CreateUserApplicationService'
import IValidation from '../ports/validations/Validation'

class CreateUserApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(
    private userRepository: IUserRepository,
    private authenticationService: IAuthenticationService,
    private usernameTakenValidation: IValidation
  ) {
    super()
  }

  public async exec({
    userId,
    username
  }: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
    this.assertArgumentNotNull(
      username,
      new UserError('ERR_USERNAME_NOT_PROVIDED')
    )
    await this.usernameTakenValidation.validate(username)

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

    const accessKey = this.authenticationService.generateAccessKey(
      user.id,
      process.env.JWT_SECRET,
      600 // 10 minutes
    )

    return { userId: user.id, accessKey }
  }
}

export default CreateUserApplicationService
