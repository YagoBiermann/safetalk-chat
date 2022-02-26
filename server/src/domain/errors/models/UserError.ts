import AppError from '../ports/AppError'
import { IUserErrorMessages } from '../ports/UserError'

class UserError extends AppError {
  constructor(error: IUserErrorMessages) {
    super(error)
    this.name = this.constructor.name
  }
}

export default UserError
