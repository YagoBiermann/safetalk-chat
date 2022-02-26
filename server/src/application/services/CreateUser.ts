import IUserRepository from '../../domain/models/user/UserRepository'
import {
  ICreateUserOutputDTO,
  ICreateUserAppService
} from '../ports/services/CreateUser'
import IAuthenticator from '../../domain/models/auth/Authenticator'
import User from '../../domain/models/user/User'
import IValidator from '../ports/validations/Validator'

class CreateUserAppService implements ICreateUserAppService {
  constructor(
    private userRepo: IUserRepository,
    private auth: IAuthenticator,
    private validator: IValidator
  ) {}

  public async exec(
    username: string,
    userId: string
  ): Promise<ICreateUserOutputDTO> {
    await this.validator.validate(username)

    if (userId) {
      await this.userRepo.delete(userId)
    }

    const user = new User({
      id: null,
      username,
      isOnline: false,
      room: null
    })

    await this.userRepo.create(user)

    const accessKey = this.auth.generateAccessKey(
      user.id,
      process.env.JWT_SECRET,
      600
    )

    return { userId: user.id, accessKey }
  }
}

export default CreateUserAppService
