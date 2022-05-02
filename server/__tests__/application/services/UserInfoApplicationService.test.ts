import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import AuthenticationFactoryMock from '../../../__mocks__/infrastructure/jwt/AuthenticationFactory'
import UserInfoApplicationService from '../../../src/application/services/UserInfoApplicationService'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import MESSAGE_TYPE from '../../../src/domain/models/room/message/MessageType'
import Room from '../../../src/domain/models/room/Room'
import User from '../../../src/domain/models/user/User'
import UserNotExistsValidation from '../../../src/application/validations/UserNotExistsValidation'

describe('tests on class UserInfoApplicationService', () => {
  const roomRepositoryMock = new RoomRepositoryMock()
  const userRepositoryMock = new UserRepositoryMock()
  const authentication = AuthenticationFactoryMock.make(userRepositoryMock)
  const validation = new UserNotExistsValidation(userRepositoryMock)
  const userInfoApplicationService = new UserInfoApplicationService(
    userRepositoryMock,
    roomRepositoryMock,
    authentication,
    validation
  )

  const spyOnAuthenticate = jest.spyOn(authentication, 'authenticate')
  const spyOnGetUserById = jest.spyOn(userRepositoryMock, 'getUserById')
  const spyOnGetRoomById = jest.spyOn(roomRepositoryMock, 'getRoomById')
  const spyOnValidation = jest.spyOn(validation, 'validate')
  const roomCode = Room.generateRoomCode().value
  const userId = uuidv4()
  const roomId = uuidv4()
  const roomAccessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_ROOM_SECRET,
    '3d'
  )

  test('should get user info', async () => {
    const messageId = uuidv4()
    spyOnGetUserById.mockImplementation(() => {
      const user = new User({ id: userId, username: 'test', room: roomId })
      user.connect(roomId)
      return Promise.resolve(user)
    })
    spyOnGetRoomById.mockImplementation(() => {
      const room = new Room({
        id: roomId,
        roomCode
      })
      room.connect(userId)
      room.addMessage({
        createdAt: Date.now(),
        message: 'test',
        messageType: MESSAGE_TYPE.TEXT,
        roomCode,
        username: 'test',
        file: null,
        messageId
      })
      return Promise.resolve(room)
    })
    const result = jest.fn(async () => {
      return await userInfoApplicationService.exec({
        accessKey: roomAccessKey,
        userId
      })
    })
    await result().then(res => {
      expect(spyOnAuthenticate).toHaveBeenCalled()
      expect(spyOnGetUserById).toHaveBeenCalled()
      expect(spyOnGetRoomById).toHaveBeenCalled()
      expect(spyOnValidation).toHaveBeenCalled()
      expect(res.roomCode).toBe(roomCode)
      expect(res.isOnline).toBe(true)
      expect(res.username).toBe('test')
      expect(res.userId).toBe(userId)
      expect(res.messages.length).toBe(1)
      expect(res.messages[0].messageId).toBe(messageId)
      expect(res.messages[0].message).toBe('test')
      expect(res.messages[0].messageType).toBe(MESSAGE_TYPE.TEXT)
      expect(res.messages[0].username).toBe('test')
      expect(res.messages[0].createdAt).toBeDefined()
    })
  })

  test('should throw error if user not exists', async () => {
    spyOnGetUserById.mockImplementation(() => {
      return Promise.resolve(null)
    })
    const result = jest.fn(async () => {
      return await userInfoApplicationService.exec({
        accessKey: roomAccessKey,
        userId
      })
    })
    expect(result()).rejects.toThrow()
  })
})
