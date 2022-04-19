import { describe, expect, test } from '@jest/globals'
import UserError from '../../../src/domain/errors/models/UserError'
import { errorMessages } from '../../../src/domain/errors/constants/index'

describe('Tests on class UserError', () => {
  test('should create an user error with ERR_INVALID_CHARACTERS', () => {
    const error = new UserError('ERR_INVALID_CHARACTERS')
    expect(error.message).toBe(errorMessages.ERR_INVALID_CHARACTERS.message)
    expect(error.name).toBe(UserError.name)
    expect(error.code).toBe(errorMessages.ERR_INVALID_CHARACTERS.code)
  })

  test('should create an user error with ERR_USERNAME_LENGTH', () => {
    const error = new UserError('ERR_USERNAME_LENGTH')
    expect(error.message).toBe(errorMessages.ERR_USERNAME_LENGTH.message)
    expect(error.name).toBe(UserError.name)
    expect(error.code).toBe(errorMessages.ERR_USERNAME_LENGTH.code)
  })

  test('should create an user error with ERR_USERNAME_NOT_PROVIDED', () => {
    const error = new UserError('ERR_USERNAME_NOT_PROVIDED')
    expect(error.message).toBe(errorMessages.ERR_USERNAME_NOT_PROVIDED.message)
    expect(error.name).toBe(UserError.name)
    expect(error.code).toBe(errorMessages.ERR_USERNAME_NOT_PROVIDED.code)
  })

  test('should create an user error with ERR_USERNAME_TAKEN', () => {
    const error = new UserError('ERR_USERNAME_TAKEN')
    expect(error.message).toBe(errorMessages.ERR_USERNAME_TAKEN.message)
    expect(error.name).toBe(UserError.name)
    expect(error.code).toBe(errorMessages.ERR_USERNAME_TAKEN.code)
  })

  test('should create an user error with ERR_USER_ALREADY_IN_ROOM', () => {
    const error = new UserError('ERR_USER_ALREADY_IN_ROOM')
    expect(error.message).toBe(errorMessages.ERR_USER_ALREADY_IN_ROOM.message)
    expect(error.name).toBe(UserError.name)
    expect(error.code).toBe(errorMessages.ERR_USER_ALREADY_IN_ROOM.code)
  })

  test('should create an user error with ERR_USER_NOT_FOUND', () => {
    const error = new UserError('ERR_USER_NOT_FOUND')
    expect(error.message).toBe(errorMessages.ERR_USER_NOT_FOUND.message)
    expect(error.name).toBe(UserError.name)
    expect(error.code).toBe(errorMessages.ERR_USER_NOT_FOUND.code)
  })
})
