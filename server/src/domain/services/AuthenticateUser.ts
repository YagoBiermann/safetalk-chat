import AuthError from '../errors/models/AuthError'
import IAuthenticator from '../models/auth/Authenticator'
import IUserRepository from '../models/user/UserRepository'

class AuthenticateUserService {
  constructor(
    private userRepo: IUserRepository,
    private auth: IAuthenticator
  ) {}
  public async authenticate(userId: string, accessKey: string) {
    const user = await this.userRepo.getUserById(userId)
    if (!user) {
      throw new AuthError('ERR_SESSION_EXPIRED')
    }

    if (user.room) {
      this.auth.verify(accessKey, process.env.JWT_ROOM_SECRET)
    }
    this.auth.verify(accessKey, process.env.JWT_SECRET)
  }
}

export default AuthenticateUserService
