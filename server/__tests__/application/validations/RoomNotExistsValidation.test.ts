import RoomNotExistsValidation from '../../../src/application/validations/RoomNotExistsValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Room from '../../../src/domain/models/room/Room'
import RoomError from '../../../src/domain/errors/models/RoomError'
import { v4 as uuidv4 } from 'uuid'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'

describe('tests on class RoomNotExistsValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should throw an error if room with roomCode not exists', async () => {
    const roomRepositoryMock = new RoomRepositoryMock()
    const roomCode = Room.generateRoomCode().value
    const spyOnGetRoomByCodeWithNullReturn = jest
      .spyOn(roomRepositoryMock, 'getRoomByCode')
      .mockImplementation((roomCode: string) => {
        return Promise.resolve(null)
      })
    const roomNotExistsValidation = new RoomNotExistsValidation(
      roomRepositoryMock
    )
    const result = jest.fn(async () => {
      return await roomNotExistsValidation.validate({ roomCode })
    })
    await result().catch(error => {
      expect(spyOnGetRoomByCodeWithNullReturn).toHaveBeenCalledTimes(1)
    })

    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_NOT_FOUND'))
  })

  test('Should throw an error if room with roomId not exists', async () => {
    const roomRepositoryMock = new RoomRepositoryMock()
    const spyOnGetRoomByIdWithNullReturn = jest
      .spyOn(roomRepositoryMock, 'getRoomById')
      .mockImplementation((roomId: string) => {
        return Promise.resolve(null)
      })
    const result = jest.fn(async () => {
      const roomNotExistsValidation = new RoomNotExistsValidation(
        roomRepositoryMock
      )
      return await roomNotExistsValidation.validate({ roomId: uuidv4() })
    })
    await result().catch(error => {
      expect(spyOnGetRoomByIdWithNullReturn).toHaveBeenCalledTimes(1)
    })

    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_NOT_FOUND'))
  })

  test('Should return null if room with roomId was found', async () => {
    const roomRepositoryMock = new RoomRepositoryMock()
    const spyOnGetRoomById = jest.spyOn(roomRepositoryMock, 'getRoomById')
    const result = jest.fn(async () => {
      const roomNotExistsValidation = new RoomNotExistsValidation(
        roomRepositoryMock
      )
      return await roomNotExistsValidation.validate({
        roomId: uuidv4()
      })
    })

    await result().then(() => {
      expect(spyOnGetRoomById).toHaveBeenCalledTimes(1)
    })

    expect(result()).resolves.toBeNull()
  })

  test('Should return null if room with roomCode was found', async () => {
    const roomRepositoryMock = new RoomRepositoryMock()
    const spyOnGetRoomByCode = jest.spyOn(roomRepositoryMock, 'getRoomByCode')
    const result = jest.fn(async () => {
      const roomCode = Room.generateRoomCode().value
      const roomNotExistsValidation = new RoomNotExistsValidation(
        roomRepositoryMock
      )
      return await roomNotExistsValidation.validate({ roomCode })
    })
    await result().then(() => {
      expect(spyOnGetRoomByCode).toHaveBeenCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
