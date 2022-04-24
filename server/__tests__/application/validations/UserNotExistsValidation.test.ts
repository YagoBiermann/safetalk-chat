import UserNotExistsValidation from '../../../src/application/validations/UserNotExistsValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import User from '../../../src/domain/models/user/User'
import UserError from '../../../src/domain/errors/models/UserError'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'

describe('tests on class UserNotExistsValidation', () => {
  const userRepositoryMock = jest.fn(({ filled }: { filled: boolean }) => {
    const user = new User({ id: null, username: 'test' })
    return {
      getUserById: jest.fn((userId: string) => {
        return filled ? Promise.resolve(user) : Promise.resolve(null)
      })
    }
  })

  test('should throw an error if user not exists', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserById = jest
      .spyOn(userRepositoryMock, 'getUserById')
      .mockImplementation((userId: string) => {
        return Promise.resolve(null)
      })
    const validation = new UserNotExistsValidation(userRepositoryMock)

    const result = jest.fn(async () => {
      return await validation.validate('test')
    })
    await result().catch(error => {
      expect(spyOnGetUserById).toBeCalledTimes(1)
    })
    expect(result()).rejects.toThrowError(new UserError('ERR_USER_NOT_FOUND'))
  })

  test('should return null if user exists', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserById = jest.spyOn(userRepositoryMock, 'getUserById')
    const validation = new UserNotExistsValidation(userRepositoryMock)

    const result = jest.fn(async () => {
      return await validation.validate('test')
    })
    await result().then(() => {
      expect(spyOnGetUserById).toBeCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
