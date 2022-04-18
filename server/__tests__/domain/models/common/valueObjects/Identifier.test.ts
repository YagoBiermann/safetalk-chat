import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Identifier from '../../../../../src/domain/models/common/valueObjects/Identifier'
import { v4 as uuidv4 } from 'uuid'

class IdentifierMock extends Identifier {
  constructor(id?: string) {
    super(id)
  }

  public get value(): string {
    return super.value
  }
}

describe('Tests on class Identifier', () => {
  test('Should create an identifier with predefined id', () => {
    const id = uuidv4()
    const identifier = new IdentifierMock(id)
    expect(identifier.value).toBe(id)
    expect(identifier).toBeDefined()
  })

  test('Should throw an error when the identifier is invalid', () => {
    const id = 'INVALID_IDENTIFIER'
    const mockedIdentifier = jest.fn(() => new IdentifierMock(id))
    expect(mockedIdentifier).toThrowError(
      new Error(`${id} is not a valid identifier`)
    )
  })

  test('Should create identifier with random uuid', () => {
    const identifier = new IdentifierMock()
    expect(identifier.value).toBeDefined()
    expect(identifier).toBeDefined()
  })
})
