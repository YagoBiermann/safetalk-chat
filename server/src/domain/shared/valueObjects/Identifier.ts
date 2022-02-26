import { v4 as uuidv4 } from 'uuid'

class Identifier {
  private readonly _id: string

  constructor(id?: string) {
    if (id) {
      if (!Identifier._isValid(id)) {
        throw new Error(`${id} is not a valid identifier`)
      }

      Object.freeze((this._id = id))
    }

    Object.freeze((this._id = uuidv4()))
  }

  public get value(): string {
    return this._id
  }

  public equals(object: Identifier): boolean {
    if (object === null || object === undefined) {
      return false
    }
    if (!(object instanceof this.constructor)) {
      return false
    }
    return object.value === this._id
  }

  private static _isValid(id: string): boolean {
    const isValidUUID = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    ).test(id)

    if (isValidUUID && id.length <= 36) {
      return true
    }
  }
}

export default Identifier
