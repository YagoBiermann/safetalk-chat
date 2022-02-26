import AuthenticateUserService from '../../domain/services/AuthenticateUser'
import IAuthenticationAppService from '../ports/services/Authentication'
import IValidator from '../ports/validations/Validator'

class AuthenticationAppService implements IAuthenticationAppService {
  constructor(
    private accessKeyValidator: IValidator,
    private authDomainService: AuthenticateUserService
  ) {}
  public async exec(userId: string, accessKey: string) {
    this.accessKeyValidator.validate(accessKey)
    await this.authDomainService.authenticate(userId, accessKey)
    return null
  }
}

export default AuthenticationAppService
