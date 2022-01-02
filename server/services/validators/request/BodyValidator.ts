import AppError from '../../errors/AppError'
import { IBodyValidator } from '../interfaces'

class BodyValidator implements IBodyValidator {
  
  public checkMissingBody(body: Object): void {
    const bodyLength = Object.keys(body).length
    if (bodyLength === 0) {
      throw new AppError('ERR_MISSING_BODY')
    }
  }

  public checkTooManyFields(body: Object): void {
    const bodyLength = Object.keys(body).length
    if (bodyLength > 3) {
      throw new AppError('ERR_TOO_MANY_FIELDS')
    }
  }
}

export { BodyValidator }
