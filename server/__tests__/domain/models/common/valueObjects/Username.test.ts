import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import UserError from '../../../../../src/domain/errors/models/UserError'
import Username from '../../../../../src/domain/models/common/valueObjects/Username'

describe('Tests on class Username', () => {
  test('Should create an username', () => {
    const nick = 'testUsername'
    const username = new Username(nick)
    expect(username.value).toBe(nick)
    expect(username).toBeDefined()
  })

  test('Should throw an error if username contains invalid characters', () => {
    const id = 'INVALID_USERNAME.,/'
    const mockedUsername = jest.fn(() => new Username(id))
    expect(mockedUsername).toThrowError(new UserError('ERR_INVALID_CHARACTERS'))
  })

  test('Should throw an error if username is too short', () => {
    const nick = 'a'
    const mockedUsername = jest.fn(() => new Username(nick))
    expect(mockedUsername).toThrowError(new UserError('ERR_USERNAME_LENGTH'))
  })

  test('Should throw an error if username is too long', () => {
    const nick = 'a'.repeat(21)
    const mockedUsername = jest.fn(() => new Username(nick))
    expect(mockedUsername).toThrowError(new UserError('ERR_USERNAME_LENGTH'))
  })
})
