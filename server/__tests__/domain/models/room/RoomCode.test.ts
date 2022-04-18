import RoomCode from '../../../../src/domain/models/room/RoomCode'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import short from 'short-uuid'
import RoomError from '../../../../src/domain/errors/models/RoomError'

describe('Tests on class room code', () => {
  test('Should create a room code', () => {
    const roomCode = new RoomCode()
    expect(roomCode.value).toBeDefined()
    expect(roomCode).toBeDefined()
  })

  test('Should create a room code with a value', () => {
    const id = short.generate()
    const roomCode = new RoomCode(id)
    expect(roomCode.value).toBe(id)
    expect(roomCode).toBeDefined()
  })

  test('Should throw an error when the room code is invalid', () => {
    const id = 'INVALID_ROOM_CODE'
    const mockedRoomCode = jest.fn(() => new RoomCode(id))
    expect(mockedRoomCode).toThrowError(new RoomError('ERR_INVALID_ROOM_CODE'))
  })

  test('Should throw an error when provided an invalid uuid', () => {
    const id = short.uuid() + '-53425'
    const mockedRoomCode = jest.fn(() => new RoomCode(id))
    expect(mockedRoomCode).toThrowError(new RoomError('ERR_INVALID_ROOM_CODE'))
  })
})
