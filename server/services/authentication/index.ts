import { IHeaderValidator } from '../validations/interfaces'
import jwt from 'jsonwebtoken'
import { HeaderValidator } from '../validations/request/HeaderValidator'
import { IAuthenticator as IAuthenticationService } from './interfaces'

class AuthenticationService implements IAuthenticationService {
  constructor(private headerValidator: IHeaderValidator) {}

  public validateToken(cookie: string, secret: string): void {
    this.headerValidator.checkCookie(cookie)
    const token = cookie.split(' ')[1]
    jwt.verify(token, secret)
  }

  public generateToken(
    id: string,
    secret: string,
    expiresIn: string | number
  ): string {
    const token = jwt.sign({}, secret, { expiresIn, subject: id })
    return `Bearer ${token}`
  }
}

class AuthFactory {
  public createAuthenticationService(): AuthenticationService {
    return new AuthenticationService(new HeaderValidator())
  }
}

export default AuthFactory
