import jwt from 'jsonwebtoken'
import IValidation from '../../application/ports/validations/Validation'
import AuthError from '../../domain/errors/models/AuthError'
import {
  IAuthenticationInputDTO,
  IAuthenticationService
} from '../../domain/models/auth/AuthenticationService'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import IUserRepository from '../../domain/models/user/UserRepository'

class Authentication implements IAuthenticationService {
  constructor(
    private userRepository: IUserRepository,
    private accessKeyValidation: IValidation
  ) {}
  public generateAccessKey(
    data: string,
    secret: string,
    expiresIn: string | number
  ): string {
    return jwt.sign({}, secret, { expiresIn, subject: data })
  }

  private verify(accessKey: string, secret: string): AuthError | null {
    jwt.verify(accessKey, secret, err => {
      if (err) {
        return new AuthError('ERR_INVALID_ACCESS_KEY')
      }
    })
    return null
  }

  public async authenticate({
    accessKey,
    userId
  }: IAuthenticationInputDTO): Promise<AuthError | null> {
    this.accessKeyValidation.validate({ accessKey, userId })
    const user = await this.userRepository.getUserById(userId)
    if (!user) {
      throw new AuthError('ERR_NOT_AUTHORIZED')
    }

    if (user.room) {
      this.verify(accessKey, process.env.JWT_ROOM_SECRET)
    }
    this.verify(accessKey, process.env.JWT_SECRET)
    return null
  }
}

export default Authentication
