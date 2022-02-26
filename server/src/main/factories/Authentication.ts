import AuthenticateUserService from '../../domain/services/AuthenticateUser'
import AuthenticationAppService from '../../application/services/Authentication'
import AccessKeyValidator from '../../application/validations/leaf/AccessKeyValidator'
import UserRepositoryFactory from '../../infrastructure/database/repositories/factories/UserRepository'
import Authenticator from '../../infrastructure/jwt/Authenticator'

class AuthenticationFactory {
  make() {
    const auth = new Authenticator()
    const userRepo = new UserRepositoryFactory().make()
    const accessKeyValidator = new AccessKeyValidator()
    const authDomainService = new AuthenticateUserService(userRepo, auth)
    const authenticationAppService = new AuthenticationAppService(
      accessKeyValidator,
      authDomainService
    )
    return authenticationAppService
  }
}

export default AuthenticationFactory
