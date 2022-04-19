import RoomAlreadyExistsValidation from '../../../src/application/validations/RoomAlreadyExistsValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Room from '../../../src/domain/models/room/Room'
import RoomError from '../../../src/domain/errors/models/RoomError'

describe('Tests on class RoomAlreadyExistsValidation', () => {
  const mockedRoomRepository = jest.fn(
    ({ returnRoom }: { returnRoom: boolean }) => {
      if (returnRoom) {
        return {
          getRoomByCode: jest.fn((roomCode: string) => {
            const room = new Room({ roomCode })
            return room
          })
        }
      }

      return {
        getRoomByCode: jest.fn((roomCode: string) => {
          return Promise.resolve(null)
        })
      }
    }
  )
  test(`should return null if room doesn't exists`, async () => {
    const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
      mockedRoomRepository({ returnRoom: false }) as any
    )
    const roomCode = Room.generateRoomCode().value
    const result = jest.fn(async () => {
      return await roomAlreadyExistsValidation.validate(roomCode)
    })
    expect(result()).resolves.toBe(null)
  })

  test('should throw an error if room exists', async () => {
    const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
      mockedRoomRepository({ returnRoom: true }) as any
    )
    const roomCode = Room.generateRoomCode().value
    const result = jest.fn(async () => {
      return await roomAlreadyExistsValidation.validate(roomCode)
    })
    expect(mockedRoomRepository).toBeCalledTimes(1)
    expect(result()).rejects.toThrowError(new RoomError('ERR_ROOM_TAKEN'))
  })
})
