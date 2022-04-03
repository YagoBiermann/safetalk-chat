import AuthError from '../../domain/errors/models/AuthError'
import { IAuthenticationInputDTO } from '../ports/services/AuthenticationService'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import IValidation from '../ports/validations/Validation'

class AccessKeyValidation
  extends ArgumentAssertion
  implements IValidation<IAuthenticationInputDTO, AuthError | null>
{
  constructor() {
    super()
  }
  public validate({
    accessKey,
    userId
  }: IAuthenticationInputDTO): AuthError | null {
    this.assertArgumentNotNull(userId, new AuthError('ERR_NOT_AUTHORIZED'))
    this.assertArgumentNotNull(
      accessKey,
      new AuthError('ERR_ACCESS_KEY_NOT_PROVIDED')
    )
    this.assertArgumentSuitableWithPattern(
      accessKey,
      /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/,
      new AuthError('ERR_INVALID_ACCESS_KEY')
    )

    return null
  }
}

export default AccessKeyValidation
