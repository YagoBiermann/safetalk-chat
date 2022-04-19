import AccessKeyValidation from '../../../src/application/validations/AccessKeyValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import AuthenticationFactory from '../../../src/infrastructure/jwt/AuthenticationFactory'
import { v4 as uuidv4 } from 'uuid'
import AuthError from '../../../src/domain/errors/models/AuthError'

describe('Tests on class AccessKeyValidation', () => {
  const userId = uuidv4()
  const accessKey = AuthenticationFactory.make().generateAccessKey(
    'test',
    'SKADJSALKDJ32JR9238JR98JSD98XCB9CV',
    0
  )
  test('should validate access key with regex', () => {
    const result = new AccessKeyValidation().validate({ accessKey, userId })
    expect(result).toBe(null)
  })

  test('should throw an error when userId is not provided', () => {
    const result = jest.fn(() => {
      return new AccessKeyValidation().validate({
        accessKey,
        userId: undefined
      })
    })
    expect(result).toThrowError(new AuthError('ERR_NOT_AUTHORIZED'))
  })

  test('should throw an error when access key is not provided', () => {
    const result = jest.fn(() => {
      return new AccessKeyValidation().validate({
        accessKey: null,
        userId
      })
    })
    expect(result).toThrowError(new AuthError('ERR_ACCESS_KEY_NOT_PROVIDED'))
  })

  test(`should throw an error if access key don't match regex pattern`, () => {
    const result = jest.fn(() => {
      return new AccessKeyValidation().validate({
        accessKey: 'invalid access key',
        userId
      })
    })
    expect(result).toThrowError(new AuthError('ERR_INVALID_ACCESS_KEY'))
  })
})
