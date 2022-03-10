import { errorMessages } from '../constants'

interface IAppErrorMessageModel {
  [key: string]: {
    message: string
    code: number
  }
}

abstract class AppError extends Error {
  public code: number
  constructor(error: string) {
    super(error)
    this.name = this.constructor.name
    this.message = errorMessages[error].message
    this.code = errorMessages[error].code
  }
}

export { IAppErrorMessageModel }
export default AppError
