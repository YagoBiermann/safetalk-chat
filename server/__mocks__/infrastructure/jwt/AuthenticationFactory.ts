import { IAuthenticationService } from '../../../src/application/ports/services/AuthenticationService'
import AccessKeyValidation from '../../../src/application/validations/AccessKeyValidation'
import Authentication from '../../../src/infrastructure/jwt/JWTAuthentication'
import UserRepositoryMock from '../Database/UserRepository.mock'

class AuthenticationFactoryMock {
  private constructor() {}

  public static make(
    userRepository: UserRepositoryMock
  ): IAuthenticationService {
    const accessKeyValidation = new AccessKeyValidation()
    return new Authentication(userRepository, accessKeyValidation)
  }
}

export default AuthenticationFactoryMock
