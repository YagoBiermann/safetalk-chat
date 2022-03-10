import AppError from '../ports/AppError'
import IAuthErrorMessages from '../ports/AuthError'

class AuthError extends AppError {
  constructor(error: IAuthErrorMessages) {
    super(error)
    this.name = this.constructor.name
  }
}

export default AuthError
