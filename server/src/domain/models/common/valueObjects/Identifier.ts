import { v4 as uuidv4 } from 'uuid'
import ValueObject from '../ValueObject'

abstract class Identifier extends ValueObject {
  private readonly _id: string

  constructor(id?: string) {
    super()
    if (id) {
      this.isValid(id)
      Object.freeze((this._id = id))
      return
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

  private isValid(id: string): Error | null {
    this.assertArgumentSuitableWithPattern(
      id,
      new RegExp(
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      ),
      new Error(`${id} is not a valid identifier`)
    )

    this.assertArgumentStringLength(
      id,
      0,
      36,
      new Error(`${id} is not a valid identifier`)
    )
    return null
  }
}

export default Identifier
