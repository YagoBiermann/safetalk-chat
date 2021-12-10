import { ERR_MISSING_BODY, ERR_TOO_MANY_FIELDS } from '../../errors/constants'

class BodyValidator {
  public checkMissingBody(body: Object): void {
    const bodyLength = Object.keys(body).length
    if (bodyLength === 0) {
      throw ERR_MISSING_BODY
    }
  }

  public checkTooManyFields(body: Object): void {
    const bodyLength = Object.keys(body).length
    if (bodyLength > 3) {
      throw ERR_TOO_MANY_FIELDS
    }
  }
}

export { BodyValidator }
