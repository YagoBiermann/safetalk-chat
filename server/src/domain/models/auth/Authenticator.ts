import AuthError from '../../errors/models/AuthError'

interface IAuthenticator {
  generateAccessKey(
    data: string,
    secret: string,
    expiresIn: string | number
  ): string
  verify(accessKey: string, secret: string): AuthError | null
}

export default IAuthenticator
