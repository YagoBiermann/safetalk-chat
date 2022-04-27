import {
  describe,
  expect,
  afterEach,
  beforeEach,
  test,
  jest
} from '@jest/globals'
import CreateRoomApplicationService from '../../../src/application/services/CreateRoomApplicationService'
import UserError from '../../../src/domain/errors/models/UserError'
import Authentication from '../../../src/infrastructure/jwt/JWTAuthentication'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import UserAlreadyInRoomValidation from '../../../src/application/validations/UserAlreadyInRoomValidation'
import RoomAlreadyExistsValidation from '../../../src/application/validations/RoomAlreadyExistsValidation'
import ChangeUserStatusWhenJoinedRoomEventSubscriber from '../../../src/application/subscribers/userJoinedRoom/ChangeStatusWhenUserJoinedRoomEventSubscriber'
import AWSManager from '../../../src/infrastructure/aws/AWSManager'
import AccessKeyValidation from '../../../src/application/validations/AccessKeyValidation'
import SingleTransaction from '../../../__mocks__/infrastructure/Database/SingleTransaction.mock'
import { v4 as uuidv4 } from 'uuid'
import Room from '../../../src/domain/models/room/Room'
import User from '../../../src/domain/models/user/User'
import RoomError from '../../../src/domain/errors/models/RoomError'

describe('tests on class CreateRoomApplicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userId = uuidv4()
  const roomCode = Room.generateRoomCode().value
  const accessKeyValidation = new AccessKeyValidation()
  const userRepositoryMock = new UserRepositoryMock()
  const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
    userRepositoryMock
  )
  const roomRepositoryMock = new RoomRepositoryMock()
  const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
    roomRepositoryMock
  )

  const authentication = new Authentication(
    userRepositoryMock,
    accessKeyValidation
  )
  const accessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_SECRET,
    '1h'
  )

  const roomAccessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_ROOM_SECRET,
    '1h'
  )
  const awsManager = new AWSManager()
  const singleTransaction = new SingleTransaction()
  const subscriber = new ChangeUserStatusWhenJoinedRoomEventSubscriber(
    userRepositoryMock,
    singleTransaction
  )

  const createRoomAppService = new CreateRoomApplicationService(
    authentication,
    awsManager,
    roomAlreadyExistsValidation,
    userAlreadyInRoomValidation,
    subscriber
  )

  // spies
  const spyOnRoomAlreadyExistsValidation = jest.spyOn(
    roomAlreadyExistsValidation,
    'validate'
  )
  const spyOnUserAlreadyInRoomValidation = jest.spyOn(
    userAlreadyInRoomValidation,
    'validate'
  )
  const spyOnUserRepositoryMock = jest.spyOn(userRepositoryMock, 'getUserById')
  const spyOnRoomRepositoryMock = jest.spyOn(
    roomRepositoryMock,
    'getRoomByCode'
  )
  const spyOnAuthentication = jest.spyOn(authentication, 'authenticate')
  const spyOnGenerateAccessKey = jest.spyOn(authentication, 'generateAccessKey')
  const spyOnSingleTransaction = jest.spyOn(singleTransaction, 'saveAll')
  const spyOnSubscriber = jest.spyOn(subscriber, 'handleEvent')
  const spyOnAwsManager = jest.spyOn(awsManager, 'getSignedCookie')

  test('should create a new room', async () => {
    spyOnRoomRepositoryMock.mockImplementationOnce(() => {
      return Promise.resolve(null)
    })
    const result = jest.fn(async () => {
      return await createRoomAppService.exec({
        auth: { accessKey, userId },
        roomCode
      })
    })

    await result().then(res => {
      expect(spyOnAuthentication).toBeCalled()
      expect(spyOnRoomAlreadyExistsValidation).toBeCalled()
      expect(spyOnUserAlreadyInRoomValidation).toBeCalled()
      expect(spyOnSubscriber).toBeCalled()
      expect(spyOnGenerateAccessKey).toBeCalled()
      expect(spyOnAwsManager).toBeCalled()
      expect(spyOnUserRepositoryMock).toBeCalled()
      expect(spyOnRoomRepositoryMock).toBeCalled()
      expect(res.cloudAccessKeys).toBeTruthy()
      expect(res.newAccessKey).toBeTruthy()
      expect(res.roomId).toBeTruthy()
    })
  })

  test('should throw an error if room already exists', async () => {
    const result = jest.fn(async () => {
      return await createRoomAppService.exec({
        auth: { accessKey, userId },
        roomCode: Room.generateRoomCode().value
      })
    })

    await result().catch(err => {
      expect(spyOnAuthentication).toBeCalled()
      expect(spyOnRoomAlreadyExistsValidation).toBeCalled()
      expect(spyOnUserAlreadyInRoomValidation).not.toBeCalled()
      expect(spyOnSubscriber).not.toBeCalled()
      expect(spyOnGenerateAccessKey).not.toBeCalled()
      expect(spyOnAwsManager).not.toBeCalled()
      expect(spyOnUserRepositoryMock).toBeCalled()
      expect(spyOnRoomRepositoryMock).toBeCalled()
    })

    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_TAKEN'))
  })

  test('should throw an error if user already in room', async () => {
    spyOnRoomRepositoryMock.mockImplementation(() => {
      return Promise.resolve(null)
    })
    spyOnUserRepositoryMock.mockImplementation(() => {
      const user = new User({ id: userId, username: 'test', room: uuidv4() })
      return Promise.resolve(user)
    })
    const result = jest.fn(async () => {
      return await createRoomAppService.exec({
        auth: { accessKey: roomAccessKey, userId },
        roomCode: Room.generateRoomCode().value
      })
    })

    await result().catch(err => {
      expect(spyOnAuthentication).toBeCalled()
      expect(spyOnRoomAlreadyExistsValidation).toBeCalled()
      expect(spyOnUserAlreadyInRoomValidation).toBeCalled()
      expect(spyOnSubscriber).not.toBeCalled()
      expect(spyOnGenerateAccessKey).not.toBeCalled()
      expect(spyOnAwsManager).not.toBeCalled()
      expect(spyOnUserRepositoryMock).toBeCalled()
      expect(spyOnRoomRepositoryMock).toBeCalled()
    })

    expect(result()).rejects.toThrowError(
      new UserError('ERR_USER_ALREADY_IN_ROOM')
    )
  })

  test('should throw an error if room code was not provided', async () => {
    const result = jest.fn(async () => {
      return await createRoomAppService.exec({
        auth: { accessKey, userId },
        roomCode: null
      })
    })

    await result().catch(err => {
      expect(spyOnAuthentication).not.toBeCalled()
      expect(spyOnRoomAlreadyExistsValidation).not.toBeCalled()
      expect(spyOnUserAlreadyInRoomValidation).not.toBeCalled()
      expect(spyOnSubscriber).not.toBeCalled()
      expect(spyOnGenerateAccessKey).not.toBeCalled()
      expect(spyOnAwsManager).not.toBeCalled()
      expect(spyOnUserRepositoryMock).not.toBeCalled()
      expect(spyOnRoomRepositoryMock).not.toBeCalled()
    })

    expect(result()).rejects.toThrowError(
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
  })
})
