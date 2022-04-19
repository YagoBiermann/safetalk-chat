import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import User from '../../../../src/domain/models/user/User'
import { v4 as uuidv4 } from 'uuid'
import Room from '../../../../src/domain/models/room/Room'

describe('Tests on class User', () => {
  const roomMock = jest.fn(() => {
    const roomCode = Room.generateRoomCode().value
    const id = uuidv4()
    const room = new Room({ id, roomCode })
    return { id: room.id, roomCode: room.roomCode }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should create an user', () => {
    const room = roomMock()
    const id = uuidv4()
    const username = 'username'
    const user = new User({
      id,
      room: room.id,
      username
    })
    expect(user.id).toBe(id)
    expect(user.username).toBe(username)
    expect(user.isOnline).toBe(true)
    expect(user.room).toBe(room.id)
    expect(user).toBeDefined()
  })

  test('Should connect an user', () => {
    const room = roomMock()
    const id = uuidv4()
    const username = 'username'
    const user = new User({
      id,
      room: undefined,
      username
    })
    expect(user.isOnline).toBe(false)
    expect(user.room).toBe(undefined)
    user.connect(room.id)
    expect(user.isOnline).toBe(true)
    expect(user.room).toBe(room.id)
  })

  test('Should disconnect an user', () => {
    const room = roomMock()
    const id = uuidv4()
    const username = 'username'
    const user = new User({
      id,
      room: room.id,
      username
    })
    expect(user.isOnline).toBe(true)
    expect(user.room).toBe(room.id)
    user.disconnect()
    expect(user.isOnline).toBe(false)
    expect(user.room).toBe(undefined)
  })
})
