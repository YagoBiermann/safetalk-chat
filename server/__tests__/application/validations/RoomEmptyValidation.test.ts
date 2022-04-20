import RoomEmptyValidation from '../../../src/application/validations/RoomEmptyValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Room from '../../../src/domain/models/room/Room'
import RoomError from '../../../src/domain/errors/models/RoomError'
import { v4 as uuidv4 } from 'uuid'

describe('Tests on class RoomEmptyValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const roomRepositoryMock = jest.fn(() => {
    return {
      getRoomByCode: jest.fn((roomCode: string) => {
        const room = new Room({ roomCode })
        room.connect(uuidv4())
        room.connect(uuidv4())
        room.connect(uuidv4())
        return Promise.resolve(room)
      })
    }
  })

  const userRepositoryMock = jest.fn(({ filled }: { filled: boolean }) => {
    if (filled) {
      return {
        getAllUsernamesFrom: jest.fn((roomId: string) => {
          return Promise.resolve(['user1', 'user2', 'user3'])
        })
      }
    }
    return {
      getAllUsernamesFrom: jest.fn((roomId: string) => {
        return Promise.resolve([])
      })
    }
  })

  test('Should throw an error if the room is not empty', () => {
    const roomEmptyValidation = new RoomEmptyValidation(
      roomRepositoryMock() as any,
      userRepositoryMock({ filled: true }) as any
    )
    const result = jest.fn(() => {
      const roomCode = Room.generateRoomCode().value
      return roomEmptyValidation.validate(roomCode)
    })
    expect(roomRepositoryMock).toBeCalledTimes(1)
    expect(userRepositoryMock).toBeCalledTimes(1)
    expect(result()).rejects.toThrow(new RoomError('ERR_ROOM_NOT_EMPTY'))
  })

  test('Should return null if the room is empty', () => {
    const roomEmptyValidation = new RoomEmptyValidation(
      roomRepositoryMock() as any,
      userRepositoryMock({ filled: false }) as any
    )
    const result = jest.fn(() => {
      const roomCode = Room.generateRoomCode().value
      return roomEmptyValidation.validate(roomCode)
    })
    expect(roomRepositoryMock).toBeCalledTimes(1)
    expect(userRepositoryMock).toBeCalledTimes(1)
    expect(result()).resolves.toBeNull()
  })
})
