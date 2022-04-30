import GetAllUsersFromRoomApplicationService from '../../../src/application/services/GetAllUsersFromRoomApplicationService'
import AuthenticationFactoryMock from '../../../__mocks__/infrastructure/jwt/AuthenticationFactory'
import RoomNotExistsValidation from '../../../src/application/validations/RoomNotExistsValidation'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import User from '../../../src/domain/models/user/User'
import GetUsersFromRoomDomainService from '../../../src/domain/models/services/GetUsersFromRoom'
import RoomError from '../../../src/domain/errors/models/RoomError'

describe('tests on class GetAllUsersFromRoomApplicationService', () => {
  const userRepositoryMock = new UserRepositoryMock()
  const roomRepositoryMock = new RoomRepositoryMock()
  const getUsersFromRoomDomainService = new GetUsersFromRoomDomainService(
    roomRepositoryMock,
    userRepositoryMock
  )

  const authentication = AuthenticationFactoryMock.make(userRepositoryMock)
  const validation = new RoomNotExistsValidation(roomRepositoryMock)
  const getAllUsersFromRoomApplicationService =
    new GetAllUsersFromRoomApplicationService(
      authentication,
      validation,
      roomRepositoryMock,
      getUsersFromRoomDomainService
    )

  const userId = uuidv4()
  const roomId = uuidv4()
  const accessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_SECRET,
    '1h'
  )

  const spyOnAuthentication = jest.spyOn(authentication, 'authenticate')
  const spyOnValidation = jest.spyOn(validation, 'validate')
  const spyOnGetUsersFromRoom = jest
    .spyOn(getUsersFromRoomDomainService, 'exec')
    .mockImplementation(async (roomId: string) => {
      const users = []
      for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          const user = new User({
            id: null,
            username: `user${i}`,
            room: null
          })
          users.push(user)
        } else {
          const user = new User({
            id: null,
            username: `user${i}`,
            room: uuidv4()
          })
          users.push(user)
        }
      }
      return Promise.resolve(users)
    })

  const spyOnRoomRepository = jest.spyOn(roomRepositoryMock, 'getRoomById')

  test('should return an array of users', async () => {
    const result = jest.fn(async () => {
      return await getAllUsersFromRoomApplicationService.exec({
        auth: { accessKey, userId },
        roomId
      })
    })

    await result().then(users => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnValidation).toHaveBeenCalled()
      expect(spyOnGetUsersFromRoom).toHaveBeenCalled()
      expect(spyOnRoomRepository).toHaveBeenCalled()
      expect(users).toHaveLength(10)
      users.forEach(user => {
        expect(user.username).toBeTruthy()
        expect(user.userId).toBeTruthy()
        expect(user.roomCode).toBeTruthy()
        expect(user.isOnline).toBeDefined()
      })
    })
  })

  test('should return an error if room not exists', async () => {
    spyOnRoomRepository.mockImplementation(async () => {
      return Promise.resolve(null)
    })
    const result = jest.fn(async () => {
      return await getAllUsersFromRoomApplicationService.exec({
        auth: { accessKey, userId },
        roomId: uuidv4()
      })
    })
    await result().catch(error => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnValidation).toHaveBeenCalled()
      expect(spyOnGetUsersFromRoom).not.toHaveBeenCalled()
    })

    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_NOT_FOUND'))
  })
})
