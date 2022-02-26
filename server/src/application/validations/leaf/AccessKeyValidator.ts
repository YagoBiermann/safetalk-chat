import AuthError from '../../../domain/errors/models/AuthError'
import IValidator from '../../ports/validations/Validator'

class AccessKeyValidator implements IValidator<string, AuthError | null> {
  validate(accessKey: string) {
    if (!accessKey) {
      throw new AuthError('ERR_ACCESS_KEY_NOT_PROVIDED')
    }
    const validKey =
      /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/.test(
        accessKey
      )

    if (!validKey) {
      throw new AuthError('ERR_INVALID_ACCESS_KEY')
    }
    return null
  }
}

export default AccessKeyValidator
