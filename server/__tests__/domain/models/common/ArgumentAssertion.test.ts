/**
 * @jest-environment node
 */

import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import ArgumentAssertion from '../../../../src/domain/models/common/ArgumentAssertion'

class ProxyArgumentAssertion extends ArgumentAssertion {
  public constructor() {
    super()
  }

  public testAssertArgumentNotNull(value: any, error: Error) {
    this.assertArgumentNotNull(value, error)
  }

  public testAssertArgumentNotEmptyString(value: string, error: Error) {
    this.assertArgumentNotEmptyString(value, error)
  }

  public testAssertArgumentSuitableWithPattern(
    value: string,
    regex: RegExp,
    error: Error
  ) {
    this.assertArgumentSuitableWithPattern(value, regex, error)
  }

  public testAssertArgumentStringLength(
    value: string,
    minLength: number,
    maxLength: number,
    error: Error
  ) {
    this.assertArgumentStringLength(value, minLength, maxLength, error)
  }

  public testAssertArgumentRange(
    value: any,
    min: number,
    max: number,
    error: Error
  ) {
    this.assertArgumentRange(value, min, max, error)
  }

  public testAssertArgumentNotEmptyArray(array: Array<any>, error: Error) {
    this.assertArgumentNotEmptyArray(array, error)
  }

  public testAssertArgumentNotEmptyObject(object: Object, error: Error) {
    this.assertArgumentNotEmptyObject(object, error)
  }

  public testAssertArgumentTrue(value: boolean, error: Error) {
    this.assertArgumentTrue(value, error)
  }

  public testAssertArgumentFalse(value: boolean, error: Error) {
    this.assertArgumentFalse(value, error)
  }
}

describe('Argument assertion tests', () => {
  let proxyArgumentAssertion: ArgumentAssertion
  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should be instantiated', () => {
    expect(proxyArgumentAssertion).toBeDefined()
  })
})

describe('Assert that the argument is not null or undefined', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is null', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotNull(
        null,
        new Error('argument is null')
      )
    })
    expect(result).toThrowError('argument is null')
  })

  test('should throw an error if the argument is undefined', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotNull(
        undefined,
        new Error('argument is undefined')
      )
    })
    expect(result).toThrowError('argument is undefined')
  })

  test('should return void if an argument was provided', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotNull(
        'test',
        new Error('argument is undefined')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument is not an empty string', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is an empty string', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotEmptyString(
        '',
        new Error('argument is an empty string')
      )
    })
    expect(result).toThrowError('argument is an empty string')
  })

  test('should return void if an argument was provided', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotEmptyString(
        'test',
        new Error('argument is an empty string')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument is suitable with a regex pattern', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is not suitable with the pattern', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentSuitableWithPattern(
        '.test',
        /^[a-zA-Z0-9]*$/,
        new Error('argument is not suitable with the pattern')
      )
    })
    expect(result).toThrowError('argument is not suitable with the pattern')
  })

  test('should return void if the argument is suitable with the pattern', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentSuitableWithPattern(
        'test',
        /^[a-zA-Z0-9]*$/,
        new Error('argument is not suitable with the pattern')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument string length', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is shorter than the minimum length', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentStringLength(
        'test',
        5,
        10,
        new Error('argument is shorter than the minimum length')
      )
    })
    expect(result).toThrowError('argument is shorter than the minimum length')
  })

  test('should throw an error if the argument is longer than the maximum length', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentStringLength(
        'testing',
        1,
        5,
        new Error('argument is longer than the maximum length')
      )
    })
    expect(result).toThrowError('argument is longer than the maximum length')
  })

  test('should return void if the argument is suitable with the length', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentStringLength(
        'test',
        1,
        5,
        new Error('argument is longer than the maximum length')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument range', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is not in the range', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentRange(
        -5,
        1,
        10,
        new Error('argument is not in the range')
      )
    })
    expect(result).toThrowError('argument is not in the range')
  })

  test('should return void if the argument is in the range', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentRange(
        5,
        1,
        10,
        new Error('argument is not in the range')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument is not an empty array', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is an empty array', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotEmptyArray(
        [],
        new Error('argument is an empty array')
      )
    })
    expect(result).toThrowError('argument is an empty array')
  })

  test('should return void if an the array is not empty', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotEmptyArray(
        ['test'],
        new Error('argument is an empty array')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument is not an empty object', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is an empty object', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotEmptyObject(
        {},
        new Error('argument is an empty object')
      )
    })
    expect(result).toThrowError('argument is an empty object')
  })

  test('should return void if the object is not empty', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentNotEmptyObject(
        { test: 'test' },
        new Error('argument is an empty object')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument is true', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is false', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentTrue(
        false,
        new Error('argument is false')
      )
    })
    expect(result).toThrowError('argument is false')
  })

  test('should return void if the argument is true', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentTrue(
        true,
        new Error('argument is false')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})

describe('Assert argument is false', () => {
  let proxyArgumentAssertion: ProxyArgumentAssertion

  beforeEach(() => {
    proxyArgumentAssertion = new ProxyArgumentAssertion()
    return proxyArgumentAssertion
  })

  test('should throw an error if the argument is true', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentFalse(
        true,
        new Error('argument is true')
      )
    })
    expect(result).toThrowError('argument is true')
  })

  test('should return void if the argument is false', () => {
    const result = jest.fn(() => {
      proxyArgumentAssertion.testAssertArgumentFalse(
        false,
        new Error('argument is true')
      )
    })
    result()
    expect(result).toHaveReturned()
  })
})
