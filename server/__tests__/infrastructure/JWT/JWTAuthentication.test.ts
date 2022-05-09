import AuthenticationFactoryMock from '../../../__mocks__/infrastructure/jwt/AuthenticationFactory'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import {
  describe,
  expect,
  beforeEach,
  test,
  jest
} from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import AccessKeyValidation from '../../../src/application/validations/AccessKeyValidation'
import User from '../../../src/domain/models/user/User'
import AuthError from '../../../src/domain/errors/models/AuthError'

describe('tests on class JWTAuthentication', () => {
  const userRepositoryMock = new UserRepositoryMock()
  const authentication = AuthenticationFactoryMock.make(userRepositoryMock)
  const userId = uuidv4()
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const roomAccessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_ROOM_SECRET,
    '1h'
  )
  const accessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_SECRET,
    '1h'
  )
  const invalidAccessKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  const spyOnValidation = jest.spyOn(AccessKeyValidation.prototype, 'validate')
  const spyOnGetUserById = jest.spyOn(
    UserRepositoryMock.prototype,
    'getUserById'
  )
  test('should generate access key', async () => {
    expect(accessKey).toBeDefined()
    expect(typeof accessKey).toBe('string')
  })

  test('should authenticate user with JWT_SECRET env variable', async () => {
    const result = jest.fn(
      async () => await authentication.authenticate({ accessKey, userId })
    )

    expect(result()).resolves.toBeNull()
    expect(spyOnValidation).toHaveBeenCalled()
  })

  test('should authenticate user with JWT_ROOM_SECRET env variable', async () => {
    spyOnGetUserById.mockImplementation(() => {
      const user = new User({ id: userId, username: 'JohnDoe' })
      const roomId = uuidv4()
      user.connect(roomId)
      return Promise.resolve(user)
    })
    const result = jest.fn(() => {
      return authentication.authenticate({ accessKey: roomAccessKey, userId })
    })
    expect(result()).resolves.toBeNull()
  })

  test('should throw an error when user is not authorized', async () => {
    const result = jest.fn(() => {
      return authentication.authenticate({
        accessKey: invalidAccessKey,
        userId
      })
    })

    expect(result()).rejects.toThrowError(
      new AuthError('ERR_INVALID_ACCESS_KEY')
    )
  })

  test('should throw an error when authenticating with the wrong access key', async () => {
    spyOnGetUserById.mockImplementation(() => {
      const user = new User({ id: userId, username: 'JohnDoe' })
      return Promise.resolve(user)
    })
    const result = jest.fn(() => {
      return authentication.authenticate({ accessKey: roomAccessKey, userId })
    })

    expect(result()).rejects.toThrowError(
      new AuthError('ERR_INVALID_ACCESS_KEY')
    )
  })
})
