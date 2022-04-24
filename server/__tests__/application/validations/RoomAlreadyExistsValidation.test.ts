import RoomAlreadyExistsValidation from '../../../src/application/validations/RoomAlreadyExistsValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Room from '../../../src/domain/models/room/Room'
import RoomError from '../../../src/domain/errors/models/RoomError'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'

describe('Tests on class RoomAlreadyExistsValidation', () => {
  test(`should return null if room doesn't exists`, async () => {
    const mockedRoomRepository = new RoomRepositoryMock()
    const spyOnGetRoomByCodeWithReturnVoid = jest
      .spyOn(mockedRoomRepository, 'getRoomByCode')
      .mockImplementation(() => {
        return Promise.resolve(null)
      })
    const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
      mockedRoomRepository
    )
    const roomCode = Room.generateRoomCode().value
    const result = jest.fn(async () => {
      return await roomAlreadyExistsValidation.validate(roomCode)
    })
    await result().then(() => {
      expect(spyOnGetRoomByCodeWithReturnVoid).toHaveBeenCalled()
      expect(result).not.toThrow()
    })
    expect(result()).resolves.toBe(null)
  })

  test('should throw an error if room exists', async () => {
    const roomRepositoryMock = new RoomRepositoryMock()
    const spyOnGetRoomByCode = jest.spyOn(roomRepositoryMock, 'getRoomByCode')
    const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
      roomRepositoryMock
    )
    const roomCode = Room.generateRoomCode().value
    const result = jest.fn(async () => {
      return await roomAlreadyExistsValidation.validate(roomCode)
    })
    await result().catch(() => {
      expect(spyOnGetRoomByCode).toHaveBeenCalled()
    })

    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_TAKEN'))
  })
})
