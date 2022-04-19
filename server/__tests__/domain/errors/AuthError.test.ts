import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import AuthError from '../../../src/domain/errors/models/AuthError'
import { errorMessages } from '../../../src/domain/errors/constants/index'

describe('Tests on class AuthError', () => {
  test('should create an auth error with ERR_ACCESS_KEY_NOT_PROVIDED', () => {
    const error = new AuthError('ERR_ACCESS_KEY_NOT_PROVIDED')
    expect(error.message).toBe(
      errorMessages.ERR_ACCESS_KEY_NOT_PROVIDED.message
    )
    expect(error.name).toBe(AuthError.name)
    expect(error.code).toBe(errorMessages.ERR_ACCESS_KEY_NOT_PROVIDED.code)
  })

  test('should create an auth error with ERR_INVALID_ACCESS_KEY', () => {
    const error = new AuthError('ERR_INVALID_ACCESS_KEY')
    expect(error.message).toBe(errorMessages.ERR_INVALID_ACCESS_KEY.message)
    expect(error.name).toBe(AuthError.name)
    expect(error.code).toBe(errorMessages.ERR_INVALID_ACCESS_KEY.code)
  })

  test('should create an auth error with ERR_MALFORMED_KEY', () => {
    const error = new AuthError('ERR_MALFORMED_KEY')
    expect(error.message).toBe(errorMessages.ERR_MALFORMED_KEY.message)
    expect(error.name).toBe(AuthError.name)
    expect(error.code).toBe(errorMessages.ERR_MALFORMED_KEY.code)
  })

  test('should create an auth error with ERR_NOT_AUTHORIZED', () => {
    const error = new AuthError('ERR_NOT_AUTHORIZED')
    expect(error.message).toBe(errorMessages.ERR_NOT_AUTHORIZED.message)
    expect(error.name).toBe(AuthError.name)
    expect(error.code).toBe(errorMessages.ERR_NOT_AUTHORIZED.code)
  })

  test('should create an auth error with ERR_SESSION_EXPIRED', () => {
    const error = new AuthError('ERR_SESSION_EXPIRED')
    expect(error.message).toBe(errorMessages.ERR_SESSION_EXPIRED.message)
    expect(error.name).toBe(AuthError.name)
    expect(error.code).toBe(errorMessages.ERR_SESSION_EXPIRED.code)
  })
})
