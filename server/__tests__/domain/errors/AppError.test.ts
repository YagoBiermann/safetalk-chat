import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import AppError from '../../../src/domain/errors/models/AppError'
import { errorMessages } from '../../../src/domain/errors/constants/index'

describe('Tests on class AppError', () => {
  test('should create an app error with ERR_DEFAULT', () => {
    const error = new AppError('ERR_DEFAULT')
    expect(error.message).toBe(errorMessages.ERR_DEFAULT.message)
    expect(error.name).toBe(AppError.name)
    expect(error.code).toBe(errorMessages.ERR_DEFAULT.code)
  })
})
