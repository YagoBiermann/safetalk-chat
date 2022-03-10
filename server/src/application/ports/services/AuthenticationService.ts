import AuthError from '../../../domain/errors/models/AuthError'

interface IAuthenticationInputDTO {
  userId: string
  accessKey: string
}

interface IAuthenticationService {
  generateAccessKey(
    data: string,
    secret: string,
    expiresIn: string | number
  ): string
  authenticate(auth: IAuthenticationInputDTO): Promise<AuthError | null>
}

export { IAuthenticationService, IAuthenticationInputDTO }
