import jwt from 'jsonwebtoken'
import AuthError from '../../domain/errors/models/AuthError'
import IAuthenticator from '../../domain/models/auth/Authenticator'

class Authenticator implements IAuthenticator {
  generateAccessKey(
    data: string,
    secret: string,
    expiresIn: string | number
  ): string {
    return jwt.sign({}, secret, { expiresIn, subject: data })
  }

  verify(accessKey: string, secret: string): AuthError | null {
    jwt.verify(accessKey, secret, err => {
      if (err) {
        return new AuthError('ERR_INVALID_ACCESS_KEY')
      }
    })
    return null
  }
}

export default Authenticator
