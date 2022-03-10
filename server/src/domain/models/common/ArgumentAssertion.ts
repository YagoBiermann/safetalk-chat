abstract class ArgumentAssertion {
  protected constructor() {}

  protected assertArgumentNotNull(value: any, error: Error) {
    if (value === null || value === undefined) {
      throw error
    }
  }

  protected assertArgumentNotEmptyString(value: string, error: Error) {
    if (value.length === 0) {
      throw error
    }
  }

  protected assertArgumentSuitableWithPattern(
    value: string,
    regex: RegExp,
    error: Error
  ) {
    if (!regex.test(value)) {
      throw error
    }
  }

  protected assertArgumentStringLength(
    value: string,
    minLength: number,
    maxLength: number,
    error: Error
  ) {
    if (value.length < minLength || value.length > maxLength) {
      throw error
    }
  }

  protected assertArgumentRange(
    value: any,
    min: number,
    max: number,
    error: Error
  ) {
    if (value < min || value > max) {
      throw error
    }
  }

  protected assertArgumentNotEmptyArray(array: Array<any>, error: Error) {
    if (array.length === 0) {
      throw error
    }
  }

  protected assertArgumentNotEmptyObject(object: Object, error: Error) {
    if (Object.keys(object).length === 0) {
      throw error
    }
  }

  protected assertArgumentTrue(value: boolean, error: Error) {
    if (!value) {
      throw error
    }
  }

  protected assertArgumentFalse(value: boolean, error: Error) {
    if (value) {
      throw error
    }
  }

  protected assertStateTrue(value: boolean, error: Error) {
    if (!value) {
      throw error
    }
  }

  protected assertStateFalse(value: boolean, error: Error) {
    if (value) {
      throw error
    }
  }
}

export default ArgumentAssertion
