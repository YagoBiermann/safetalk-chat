import UserAlreadyInRoomValidation from '../../../src/application/validations/UserAlreadyInRoomValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import User from '../../../src/domain/models/user/User'
import Room from '../../../src/domain/models/room/Room'
import UserError from '../../../src/domain/errors/models/UserError'
import { v4 as uuidv4 } from 'uuid'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
describe('tests on class UserAlreadyInRoomValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should throw an error if the user is null or undefined', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserById = jest
      .spyOn(userRepositoryMock, 'getUserById')
      .mockImplementation(() => {
        return Promise.resolve(null)
      })
    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      userRepositoryMock
    )
    const result = jest.fn(async () => {
      return await userAlreadyInRoomValidation.validate(uuidv4())
    })
    await result().catch(() => {
      expect(spyOnGetUserById).toBeCalledTimes(1)
    })
    expect(result()).rejects.toThrow(new UserError('ERR_USER_NOT_FOUND'))
  })

  test('should throw an error if the user is already in a room', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserById = jest
      .spyOn(userRepositoryMock, 'getUserById')
      .mockImplementation((roomId: string) => {
        const user = new User({ id: null, username: 'test' })
        user.connect(roomId)
        return Promise.resolve(user)
      })
    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      userRepositoryMock
    )
    const result = jest.fn(async () => {
      return await userAlreadyInRoomValidation.validate(uuidv4())
    })
    await result().catch(error => {
      expect(spyOnGetUserById).toBeCalledTimes(1)
    })
    expect(result()).rejects.toThrow(new UserError('ERR_USER_ALREADY_IN_ROOM'))
  })

  test('should return null if the user is not in a room', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserById = jest.spyOn(userRepositoryMock, 'getUserById')

    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      userRepositoryMock
    )
    const result = jest.fn(async () => {
      return await userAlreadyInRoomValidation.validate(uuidv4())
    })
    await result().then(() => {
      expect(spyOnGetUserById).toBeCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
