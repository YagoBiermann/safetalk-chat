import RoomNotExistsValidation from '../../../src/application/validations/RoomNotExistsValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Room from '../../../src/domain/models/room/Room'
import RoomError from '../../../src/domain/errors/models/RoomError'
import { v4 as uuidv4 } from 'uuid'

describe('tests on class RoomNotExistsValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const roomRepositoryFullfiledMock = jest.fn(() => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    return {
      getRoomById: jest.fn((roomId: string) => {
        return Promise.resolve(room)
      }),
      getRoomByCode: jest.fn((roomCode: string) => {
        return Promise.resolve(room)
      })
    }
  })

  const roomRepositoryRejectedMock = jest.fn(() => {
    return {
      getRoomById: jest.fn((roomId: string) => {
        return Promise.resolve(null)
      }),
      getRoomByCode: jest.fn((roomCode: string) => {
        return Promise.resolve(null)
      })
    }
  })

  test('Should throw an error if room with roomCode not exists', async () => {
    const roomCode = Room.generateRoomCode().value
    const roomNotExistsValidation = new RoomNotExistsValidation(
      roomRepositoryRejectedMock() as any
    )
    const result = jest.fn(async () => {
      return await roomNotExistsValidation.validate({ roomCode })
    })
    await result().catch(error => {
      expect(roomRepositoryRejectedMock).toHaveBeenCalledTimes(1)
    })

    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_NOT_FOUND'))
  })

  test('Should throw an error if room with roomId not exists', async () => {
    const result = jest.fn(async () => {
      const roomNotExistsValidation = new RoomNotExistsValidation(
        roomRepositoryRejectedMock() as any
      )
      return await roomNotExistsValidation.validate({ roomId: uuidv4() })
    })
    await result().catch(error => {
      expect(roomRepositoryRejectedMock).toHaveBeenCalledTimes(1)
    })

    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_NOT_FOUND'))
  })

  test('Should return null if room with roomId was found', async () => {
    const result = jest.fn(async () => {
      const roomNotExistsValidation = new RoomNotExistsValidation(
        roomRepositoryFullfiledMock() as any
      )
      return await roomNotExistsValidation.validate({
        roomId: uuidv4()
      })
    })

    await result().then(() => {
      expect(roomRepositoryFullfiledMock).toHaveBeenCalledTimes(1)
    })

    expect(result()).resolves.toBeNull()
  })

  test('Should return null if room with roomCode was found', async () => {
    const result = jest.fn(async () => {
      const roomCode = Room.generateRoomCode().value
      const roomNotExistsValidation = new RoomNotExistsValidation(
        roomRepositoryFullfiledMock() as any
      )
      return await roomNotExistsValidation.validate({ roomCode })
    })
    await result().then(() => {
      expect(roomRepositoryFullfiledMock).toHaveBeenCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
