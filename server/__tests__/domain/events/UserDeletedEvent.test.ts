import { describe, expect, test } from '@jest/globals'
import UserDeletedEvent from '../../../src/domain/events/UserDeletedEvent'
import { v4 as uuidv4 } from 'uuid'

describe('Tests on class UserDeletedEvent', () => {
  test('should create an user deleted event', () => {
    const roomId = uuidv4()
    const userId = uuidv4()
    const event = new UserDeletedEvent(roomId, userId)
    expect(event.roomId).toBe(roomId)
    expect(event.userId).toBe(userId)
    expect(event.occurredOn()).toBeInstanceOf(Date)
    expect(event.eventName()).toBe(UserDeletedEvent.name)
  })
})
