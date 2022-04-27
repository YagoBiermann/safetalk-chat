import {
  describe,
  expect,
  afterEach,
  beforeEach,
  test,
  jest
} from '@jest/globals'
import CreateUserApplicationService from '../../../src/application/services/CreateUserApplicationService'
import UserError from '../../../src/domain/errors/models/UserError'
import Authentication from '../../../src/infrastructure/jwt/JWTAuthentication'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import AccessKeyValidation from '../../../src/application/validations/AccessKeyValidation'
import UsernameTakenValidation from '../../../src/application/validations/UsernameTakenValidation'
import { v4 as uuidv4 } from 'uuid'

describe('tests on class CreateUserApplicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const userId = uuidv4()
  const username = 'user'
  const accessKeyValidation = new AccessKeyValidation()
  const userRepository = new UserRepositoryMock()
  const authentication = new Authentication(userRepository, accessKeyValidation)
  const usernameTakenValidation = new UsernameTakenValidation(userRepository)

  const createUserAppService = new CreateUserApplicationService(
    userRepository,
    authentication,
    usernameTakenValidation
  )

  const spyOnUserRepositorySave = jest.spyOn(userRepository, 'save')
  const spyOnUserRepositoryDelete = jest.spyOn(
    UserRepositoryMock.prototype,
    'delete'
  )
  const spyOnAuthenticationGenerateAccessKey = jest.spyOn(
    authentication,
    'generateAccessKey'
  )
  const spyOnUsernameTakenValidation = jest.spyOn(
    usernameTakenValidation,
    'validate'
  )

  test('should create a brand new user', async () => {
    const result = jest.fn(async () => {
      return await createUserAppService.exec({
        userId: null,
        username: 'user'
      })
    })
    result().then(data => {
      expect(spyOnUserRepositorySave).toHaveBeenCalled()
      expect(spyOnAuthenticationGenerateAccessKey).toHaveBeenCalled()
      expect(spyOnUsernameTakenValidation).toHaveBeenCalled()
      expect(spyOnUserRepositoryDelete).not.toHaveBeenCalled()
      expect(data.accessKey).toBeTruthy()
      expect(data.userId).toBeTruthy()
    })
  })

  test('should delete the user from db if an userId was provided', () => {
    const result = jest.fn(async () => {
      return await createUserAppService.exec({
        userId,
        username: 'user'
      })
    })
    result().then(data => {
      expect(spyOnUserRepositoryDelete).toHaveBeenCalled()
      expect(spyOnUserRepositorySave).toHaveBeenCalled()
      expect(spyOnAuthenticationGenerateAccessKey).toHaveBeenCalled()
      expect(spyOnUsernameTakenValidation).toHaveBeenCalled()
      expect(data.accessKey).toBeTruthy()
      expect(data.userId).toBeTruthy()
    })
  })

  test('should throw an error if username is not provided', () => {
    const result = jest.fn(async () => {
      return await createUserAppService.exec({
        userId: null,
        username: null
      })
    })
    result().catch(error => {
      expect(spyOnUsernameTakenValidation).not.toHaveBeenCalled()
      expect(spyOnUserRepositorySave).not.toHaveBeenCalled()
      expect(spyOnAuthenticationGenerateAccessKey).not.toHaveBeenCalled()
      expect(spyOnUserRepositoryDelete).not.toHaveBeenCalled()
    })

    expect(result).rejects.toThrowError(
      new UserError('ERR_USERNAME_NOT_PROVIDED')
    )
  })

  test('should throw an error if username is already taken', () => {
    const result = jest.fn(async () => {
      return await createUserAppService.exec({
        userId: null,
        username: 'user1'
      })
    })
    result().catch(error => {
      expect(spyOnUsernameTakenValidation).toHaveBeenCalled()
      expect(spyOnUserRepositorySave).not.toHaveBeenCalled()
      expect(spyOnAuthenticationGenerateAccessKey).not.toHaveBeenCalled()
      expect(spyOnUserRepositoryDelete).not.toHaveBeenCalled()
    })

    expect(result).rejects.toThrowError(new UserError('ERR_USERNAME_TAKEN'))
  })
})
