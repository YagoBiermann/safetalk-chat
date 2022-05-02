import JoinRoomApplicationService from '../../../src/application/services/JoinRoomApplicationService'
import AuthenticationFactoryMock from '../../../__mocks__/infrastructure/jwt/AuthenticationFactory'
import RoomNotExistsValidation from '../../../src/application/validations/RoomNotExistsValidation'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import User from '../../../src/domain/models/user/User'
import RoomError from '../../../src/domain/errors/models/RoomError'
import CloudService from '../../../__mocks__/infrastructure/aws/AWSManager.mock'
import UserAlreadyInRoomValidation from '../../../src/application/validations/UserAlreadyInRoomValidation'
import DomainEventPublisher from '../../../src/domain/models/common/DomainEventPublisher'
import ChangeStatusWhenUserJoinedRoomEventSubscriber from '../../../src/application/subscribers/userJoinedRoom/ChangeStatusWhenUserJoinedRoomEventSubscriber'
import SingleTransactionMock from '../../../__mocks__/infrastructure/Database/SingleTransaction.mock'
import Room from '../../../src/domain/models/room/Room'
import UserError from '../../../src/domain/errors/models/UserError'

describe('tests on class GetAllUsersFromRoomApplicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userRepositoryMock = new UserRepositoryMock()
  const authentication = AuthenticationFactoryMock.make(userRepositoryMock)
  const roomRepositoryMock = new RoomRepositoryMock()
  const cloudService = new CloudService()
  const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
    userRepositoryMock
  )
  const roomNotExistsValidation = new RoomNotExistsValidation(
    roomRepositoryMock
  )
  const singleTransaction = new SingleTransactionMock()
  const subscriber = new ChangeStatusWhenUserJoinedRoomEventSubscriber(
    userRepositoryMock,
    singleTransaction
  )

  const joinRoomApplicationService = new JoinRoomApplicationService(
    roomRepositoryMock,
    authentication,
    cloudService,
    roomNotExistsValidation,
    userAlreadyInRoomValidation,
    subscriber
  )
  const userId = uuidv4()
  const accessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_SECRET,
    '3d'
  )
  const roomAccessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_ROOM_SECRET,
    '3d'
  )
  const roomCode = Room.generateRoomCode().value

  const spyOnAuthentication = jest.spyOn(authentication, 'authenticate')
  const spyOnUserAlreadyInRoomValidation = jest.spyOn(
    userAlreadyInRoomValidation,
    'validate'
  )
  const spyOnRoomNotExistsValidation = jest.spyOn(
    roomNotExistsValidation,
    'validate'
  )
  const spyOnEventPublisher = jest.spyOn(
    DomainEventPublisher.prototype,
    'publish'
  )
  const spyOnRoomRepositoryMock = jest.spyOn(
    roomRepositoryMock,
    'getRoomByCode'
  )
  const spyOnGenerateAccessKey = jest.spyOn(authentication, 'generateAccessKey')
  const spyOnCloudService = jest.spyOn(cloudService, 'getSignedCookie')
  const spyOnUserRepositoryMock = jest.spyOn(userRepositoryMock, 'getUserById')
  test('should join in the room', async () => {
    const result = jest.fn(async () => {
      return await joinRoomApplicationService.exec({
        auth: { accessKey, userId },
        roomCode
      })
    })
    await result().then(res => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnUserAlreadyInRoomValidation).toHaveBeenCalled()
      expect(spyOnRoomNotExistsValidation).toHaveBeenCalled()
      expect(spyOnEventPublisher).toHaveBeenCalled()
      expect(spyOnRoomRepositoryMock).toHaveBeenCalled()
      expect(spyOnGenerateAccessKey).toHaveBeenCalled()
      expect(spyOnCloudService).toHaveBeenCalled()
      expect(res.roomId).toBeTruthy()
      expect(res.newAccessKey).toBeTruthy()
      expect(res.cloudAccessKeys).toBeTruthy()
    })
  })

  test('should throw an error when user already in room', async () => {
    const result = jest.fn(async () => {
      return await joinRoomApplicationService.exec({
        auth: { accessKey: roomAccessKey, userId },
        roomCode
      })
    })
    spyOnUserRepositoryMock.mockImplementation((userId: string) => {
      const room = uuidv4()
      const user = new User({ id: userId, username: 'test', room })
      return Promise.resolve(user)
    })
    await result().catch(res => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnRoomNotExistsValidation).toHaveBeenCalled()
      expect(spyOnUserAlreadyInRoomValidation).toHaveBeenCalled()
      expect(spyOnEventPublisher).not.toHaveBeenCalled()
      expect(spyOnGenerateAccessKey).not.toHaveBeenCalled()
      expect(spyOnCloudService).not.toHaveBeenCalled()
      expect(res.roomId).toBeUndefined()
      expect(res.newAccessKey).toBeUndefined()
      expect(res.cloudAccessKeys).toBeUndefined()
    })

    expect(result).rejects.toThrowError(
      new UserError('ERR_USER_ALREADY_IN_ROOM')
    )
  })

  test('should throw an error if room doesn`t exists', async () => {
    const result = jest.fn(async () => {
      return await joinRoomApplicationService.exec({
        auth: { accessKey: roomAccessKey, userId },
        roomCode
      })
    })
    spyOnRoomRepositoryMock.mockImplementation(() => {
      return Promise.resolve(null)
    })
    await result().catch(res => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnRoomNotExistsValidation).toHaveBeenCalled()
      expect(spyOnUserAlreadyInRoomValidation).not.toHaveBeenCalled()
      expect(spyOnEventPublisher).not.toHaveBeenCalled()
      expect(spyOnGenerateAccessKey).not.toHaveBeenCalled()
      expect(spyOnCloudService).not.toHaveBeenCalled()
      expect(res.roomId).toBeUndefined()
      expect(res.newAccessKey).toBeUndefined()
      expect(res.cloudAccessKeys).toBeUndefined()
    })

    expect(result).rejects.toThrowError(new RoomError('ERR_ROOM_NOT_FOUND'))
  })

  test('should throw an error if room code wasn`t provided', async () => {
    const result = jest.fn(async () => {
      return await joinRoomApplicationService.exec({
        roomCode: undefined,
        auth: { accessKey: roomAccessKey, userId }
      })
    })
    await result().catch(res => {
      expect(spyOnAuthentication).not.toHaveBeenCalled()
      expect(spyOnRoomNotExistsValidation).not.toHaveBeenCalled()
      expect(spyOnUserAlreadyInRoomValidation).not.toHaveBeenCalled()
      expect(spyOnEventPublisher).not.toHaveBeenCalled()
      expect(spyOnGenerateAccessKey).not.toHaveBeenCalled()
      expect(spyOnCloudService).not.toHaveBeenCalled()
      expect(res.roomId).toBeUndefined()
      expect(res.newAccessKey).toBeUndefined()
      expect(res.cloudAccessKeys).toBeUndefined()
    })

    expect(result).rejects.toThrowError(
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
  })
})
