import MessageError from '../../../src/domain/errors/models/MessageError'
import RoomError from '../../../src/domain/errors/models/RoomError'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import AuthenticationFactoryMock from '../../../__mocks__/infrastructure/jwt/AuthenticationFactory'
import SaveMessageApplicationService from '../../../src/application/services/SaveMessageApplicationService'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import MESSAGE_TYPE from '../../../src/domain/models/room/message/MessageType'
import Room from '../../../src/domain/models/room/Room'
import User from '../../../src/domain/models/user/User'

describe('tests on class SaveMessageApplicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const roomRepositoryMock = new RoomRepositoryMock()
  const userRepositoryMock = new UserRepositoryMock()
  const authentication = AuthenticationFactoryMock.make(userRepositoryMock)
  const saveMessageApplicationService = new SaveMessageApplicationService(
    userRepositoryMock,
    roomRepositoryMock,
    authentication
  )
  const spyOnAuthenticate = jest.spyOn(authentication, 'authenticate')
  const spyOnGetUserById = jest.spyOn(userRepositoryMock, 'getUserById')
  const spyOnGetRoomByCode = jest.spyOn(roomRepositoryMock, 'getRoomByCode')
  const spyOnSave = jest.spyOn(roomRepositoryMock, 'save')
  const spyOnAddMessage = jest.spyOn(Room.prototype, 'addMessage')
  const spyOnLastMessage = jest.spyOn(Room.prototype, 'lastMessage')
  const userId = uuidv4()
  const roomId = uuidv4()
  const accessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_ROOM_SECRET,
    '3d'
  )
  spyOnGetUserById.mockImplementation(() => {
    const user = new User({ id: userId, username: 'test', room: roomId })
    return Promise.resolve(user)
  })

  test('should save a message', async () => {
    const roomCode = Room.generateRoomCode().value
    const result = jest.fn(async () => {
      return await saveMessageApplicationService.exec({
        auth: { accessKey, userId },
        message: {
          createdAt: Date.now(),
          message: 'test message',
          messageType: MESSAGE_TYPE.TEXT,
          roomCode,
          file: null
        }
      })
    })
    await result().then(res => {
      expect(spyOnAuthenticate).toHaveBeenCalled()
      expect(spyOnGetUserById).toHaveBeenCalled()
      expect(spyOnGetRoomByCode).toHaveBeenCalled()
      expect(spyOnSave).toHaveBeenCalled()
      expect(spyOnAddMessage).toHaveBeenCalled()
      expect(spyOnLastMessage).toHaveBeenCalled()
      expect(res).toBeDefined()
    })

    expect(result()).resolves.toHaveProperty('message', 'test message')
    expect(result()).resolves.toHaveProperty('messageType', MESSAGE_TYPE.TEXT)
    expect(result()).resolves.toHaveProperty('roomCode', roomCode)
  })

  test('should throw an error if the message is malformed', async () => {
    const result = jest.fn(async () => {
      return await saveMessageApplicationService.exec({
        auth: { accessKey, userId },
        message: {
          createdAt: Date.now(),
          message: 'test message',
          messageType: undefined,
          roomCode: undefined,
          file: null
        }
      })
    })
    expect(result()).rejects.toThrow()
    expect(spyOnSave).not.toHaveBeenCalled()
  })
})
