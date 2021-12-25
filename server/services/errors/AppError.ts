import { errorMessages } from '../errors/constants'
import { IAppError } from './interfaces'

class AppError extends Error {
  public status: number
  constructor(error: IAppError) {
    super(error)
    this.name = this.constructor.name
    this.message = errorMessages[error].message
    this.status = errorMessages[error].status
  }
}

export default AppError