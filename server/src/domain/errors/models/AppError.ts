import AppError from '../ports/AppError'
import IAppErrorMessages from '../ports/DefaultError'

class DefaultError extends AppError {
  constructor(error: IAppErrorMessages) {
    super(error)
    this.name = this.constructor.name
  }
}

export default DefaultError
