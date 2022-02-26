import AuthError from '../../../domain/errors/models/AuthError'

interface IAuthenticationAppService {
  exec(userId: string, accessKey: string): Promise<AuthError | null>
}

export default IAuthenticationAppService
