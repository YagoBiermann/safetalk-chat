import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import GenerateRoomCodeApplicationService from '../../../src/application/services/GenerateRoomCodeApplicationService'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import { v4 as uuidv4 } from 'uuid'
import AuthenticationFactoryMock from '../../../__mocks__/infrastructure/jwt/AuthenticationFactory'
import short from 'short-uuid'

const userId = uuidv4()
const userRepositoryMock = new UserRepositoryMock()
const authentication = AuthenticationFactoryMock.make(userRepositoryMock)
const accessKey = authentication.generateAccessKey(
  userId,
  process.env.JWT_SECRET,
  '1h'
)

describe('tests on class GenerateRoomCodeApplicationService', () => {
  test('should return a room code', async () => {
    const spyOnAuthentication = jest.spyOn(authentication, 'authenticate')
    const result = jest.fn(async () => {
      return await new GenerateRoomCodeApplicationService(authentication).exec({
        accessKey,
        userId
      })
    })
    const pattern = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    )
    expect(result()).resolves.toBeTruthy()
    await result().then(({ roomCode }) => {
      const uuid = short().toUUID(roomCode)
      expect(uuid).toMatch(pattern)
      expect(spyOnAuthentication).toHaveBeenCalled()
    })
  })
})
