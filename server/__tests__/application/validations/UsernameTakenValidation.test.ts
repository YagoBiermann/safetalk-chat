import UsernameTakenValidation from '../../../src/application/validations/UsernameTakenValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import User from '../../../src/domain/models/user/User'
import UserError from '../../../src/domain/errors/models/UserError'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'

describe('tests on class UsernameTakenValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should throw an error if the username is already taken', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserBy = jest.spyOn(userRepositoryMock, 'getUserBy')
    const validation = new UsernameTakenValidation(userRepositoryMock)
    const username = 'user1'
    const result = jest.fn(async () => {
      return await validation.validate(username)
    })
    await result().catch(error => {
      expect(spyOnGetUserBy).toHaveBeenCalledTimes(1)
    })
    expect(result()).rejects.toThrowError(new UserError('ERR_USERNAME_TAKEN'))
  })

  test('should return null if username is available', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserBy = jest.spyOn(userRepositoryMock, 'getUserBy')
    const validation = new UsernameTakenValidation(userRepositoryMock)
    const username = 'test'
    const result = jest.fn(async () => {
      return await validation.validate(username)
    })
    await result().then(error => {
      expect(spyOnGetUserBy).toHaveBeenCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
