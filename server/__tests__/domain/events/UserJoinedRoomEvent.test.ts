import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import UserJoinedRoomEvent from '../../../src/domain/events/UserJoinedRoomEvent'
import Room from '../../../src/domain/models/room/Room'
import { v4 as uuidv4 } from 'uuid'

describe('Tests on class UserJoinedRoomEvent', () => {
  test('should create an user joined room event', () => {
    const roomId = uuidv4()
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode, id: roomId })
    const userId = uuidv4()
    const event = new UserJoinedRoomEvent(room, userId)
    expect(event.room).toBeInstanceOf(Room)
    expect(event.userId).toBe(userId)
    expect(event.occurredOn()).toBeInstanceOf(Date)
    expect(event.eventName()).toBe(UserJoinedRoomEvent.name)
  })
})
