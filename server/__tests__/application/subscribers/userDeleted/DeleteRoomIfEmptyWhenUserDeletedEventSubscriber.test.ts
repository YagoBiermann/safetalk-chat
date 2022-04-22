import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import DeleteRoomIfEmptyWhenUserDeletedEventSubscriber from '../../../../src/application/subscribers/userDeleted/DeleteRoomIfEmptyWhenUserDeletedEventSubscriber'
import UserDeletedEvent from '../../../../src/domain/events/UserDeletedEvent'
import Room from '../../../../src/domain/models/room/Room'
import { v4 as uuidv4 } from 'uuid'

describe('tests on class DeleteRoomIfEmptyWhenUserDeletedEventSubscriber', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userId = uuidv4()
  const userId2 = uuidv4()
  const roomCode = Room.generateRoomCode().value
  const room = new Room({ roomCode })

  const getRoomByIdMock = jest.fn((roomId: string) => {
    return Promise.resolve(room)
  })

  const getRoomByIdWithUsersMock = jest.fn((roomId: string) => {
    room.connect(userId)
    room.connect(userId2)
    return Promise.resolve(room)
  })

  const getRoomByIdVoidMock = jest.fn((roomId: string) => {
    return Promise.resolve(null)
  })

  const deleteRoomMock = jest.fn((roomId: string) => {
    return Promise.resolve()
  })

  const saveRoomMock = jest.fn((room: Room) => {
    return Promise.resolve()
  })

  const roomRepositoryMock = jest.fn(
    ({ filled, voidPromise }: { filled: boolean; voidPromise?: boolean }) => {
      return {
        getRoomById: jest.fn((roomId: string) => {
          if (!filled && voidPromise) return getRoomByIdVoidMock(roomId)
          return filled
            ? getRoomByIdWithUsersMock(roomId)
            : getRoomByIdMock(roomId)
        }),
        save: saveRoomMock,
        delete: deleteRoomMock
      }
    }
  )

  const deleteDirectoryMock = jest.fn((roomCode: string) => {})
  const cloudServiceMock = jest.fn(() => {
    return {
      deleteDirectory: deleteDirectoryMock
    }
  })

  const event = jest.fn(() => {
    return new UserDeletedEvent(room.id, userId)
  })

  const invalidEvent = jest.fn(() => {
    return new UserDeletedEvent('', '')
  })

  test('should delete the room when the last user disconnects', async () => {
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock({ filled: false }) as any,
      cloudServiceMock() as any
    )
    const result = jest.fn(() => {
      return subscriber.handleEvent(event())
    })
    await result()
    expect(getRoomByIdMock).toHaveBeenCalled()
    expect(event).toHaveBeenCalled()
    expect(deleteRoomMock).toHaveBeenCalled()
    expect(cloudServiceMock).toHaveBeenCalled()
    expect(saveRoomMock).not.toHaveBeenCalled()
  })

  test('should disconnect the user without deleting the room', async () => {
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock({ filled: true }) as any,
      cloudServiceMock() as any
    )
    const result = jest.fn(async () => {
      return await subscriber.handleEvent(event())
    })
    await result()
    expect(result).not.toThrow()
    expect(getRoomByIdWithUsersMock).toHaveBeenCalled()
    expect(event).toHaveBeenCalled()
    expect(deleteRoomMock).not.toHaveBeenCalled()
    expect(deleteDirectoryMock).not.toHaveBeenCalled()
    expect(saveRoomMock).toHaveBeenCalled()
  })

  test('should throw an error when an invalid event is provided', async () => {
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock({ filled: false }) as any,
      cloudServiceMock() as any
    )
    const result = jest.fn(async () => {
      return await subscriber.handleEvent(invalidEvent())
    })
    await result().catch(error => {
      expect(invalidEvent).toHaveBeenCalled()
    })
    expect(result()).rejects.toThrow()
  })

  test('should throw an error when the room does not exist', async () => {
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock({ filled: false, voidPromise: true }) as any,
      cloudServiceMock() as any
    )
    const result = jest.fn(async () => {
      return await subscriber.handleEvent(event())
    })
    await result().catch(error => {
      expect(event).toHaveBeenCalled()
      expect(deleteRoomMock).not.toHaveBeenCalled()
      expect(deleteDirectoryMock).not.toHaveBeenCalled()
      expect(saveRoomMock).not.toHaveBeenCalled()
      expect(getRoomByIdVoidMock).toHaveBeenCalled()
    })
    expect(result()).rejects.toThrow()
  })
})
