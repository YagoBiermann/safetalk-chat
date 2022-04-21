import UsernameTakenValidation from '../../../src/application/validations/UsernameTakenValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import User from '../../../src/domain/models/user/User'
import UserError from '../../../src/domain/errors/models/UserError'

describe('tests on class UsernameTakenValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userRepositoryMock = jest.fn(({ filled }: { filled: boolean }) => {
    const user = new User({ id: null, username: 'test' })
    if (filled) {
      return {
        getUserBy: jest.fn((username: string) => {
          if (username === 'test') {
            return Promise.resolve(user)
          }
          return Promise.resolve(null)
        })
      }
    }
    return {
      getUserBy: jest.fn((username: string) => {
        return Promise.resolve(null)
      })
    }
  })

  test('should throw an error if the username is already taken', async () => {
    const validation = new UsernameTakenValidation(
      userRepositoryMock({ filled: true }) as any
    )
    const username = 'test'
    const result = jest.fn(async () => {
      return await validation.validate(username)
    })
    await result().catch(error => {
      expect(userRepositoryMock).toHaveBeenCalledTimes(1)
    })
    expect(result()).rejects.toThrowError(new UserError('ERR_USERNAME_TAKEN'))
  })

  test('should return null if username is available', async () => {
    const validation = new UsernameTakenValidation(
      userRepositoryMock({ filled: false }) as any
    )
    const username = 'test'
    const result = jest.fn(async () => {
      return await validation.validate(username)
    })
    await result().then(error => {
      expect(userRepositoryMock).toHaveBeenCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
