import AccessKeyValidation from '../../application/validations/AccessKeyValidation'
import { IAuthenticationService } from '../../application/ports/services/AuthenticationService'
import UserRepositoryFactory from '../database/repositories/factories/UserRepository'
import Authentication from './JWTAuthentication'

class AuthenticationFactory {
  private constructor() {}

  public static make(): IAuthenticationService {
    const userRepository = UserRepositoryFactory.make()
    const accessKeyValidation = new AccessKeyValidation()
    return new Authentication(userRepository, accessKeyValidation)
  }
}

export default AuthenticationFactory
