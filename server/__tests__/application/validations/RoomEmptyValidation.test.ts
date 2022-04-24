import RoomEmptyValidation from '../../../src/application/validations/RoomEmptyValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Room from '../../../src/domain/models/room/Room'
import RoomError from '../../../src/domain/errors/models/RoomError'
import { v4 as uuidv4 } from 'uuid'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'

describe('Tests on class RoomEmptyValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const userRepositoryMock = new UserRepositoryMock()
  const roomRepositoryMock = new RoomRepositoryMock()
  const spyOnGetRoomByCode = jest
    .spyOn(roomRepositoryMock, 'getRoomByCode')
    .mockImplementation((roomCode: string) => {
      const room = new Room({ roomCode })
      room.connect(uuidv4())
      room.connect(uuidv4())
      room.connect(uuidv4())
      return Promise.resolve(room)
    })
  const spyOnGetAllUsernamesFrom = jest.spyOn(
    userRepositoryMock,
    'getAllUsernamesFrom'
  )

  test('Should throw an error if the room is not empty', async () => {
    const roomEmptyValidation = new RoomEmptyValidation(
      roomRepositoryMock,
      userRepositoryMock
    )
    const result = jest.fn(() => {
      const roomCode = Room.generateRoomCode().value
      return roomEmptyValidation.validate(roomCode)
    })
    await result().catch(() => {
      expect(spyOnGetRoomByCode).toBeCalledTimes(1)
      expect(spyOnGetAllUsernamesFrom).toBeCalledTimes(1)
    })
    expect(result()).rejects.toThrow(new RoomError('ERR_ROOM_NOT_EMPTY'))
  })

  test('Should return null if the room is empty', async () => {
    const spyOnGetAllUsernamesFrom = jest
      .spyOn(userRepositoryMock, 'getAllUsernamesFrom')
      .mockImplementation(() => {
        return Promise.resolve([])
      })
    const roomEmptyValidation = new RoomEmptyValidation(
      roomRepositoryMock,
      userRepositoryMock
    )
    const result = jest.fn(() => {
      const roomCode = Room.generateRoomCode().value
      return roomEmptyValidation.validate(roomCode)
    })

    await result().then(() => {
      expect(spyOnGetRoomByCode).toBeCalledTimes(1)
      expect(spyOnGetAllUsernamesFrom).toBeCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
