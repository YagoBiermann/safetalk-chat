import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import DeleteRoomIfEmptyWhenUserDeletedEventSubscriber from '../../../../src/application/subscribers/userDeleted/DeleteRoomIfEmptyWhenUserDeletedEventSubscriber'
import UserDeletedEvent from '../../../../src/domain/events/UserDeletedEvent'
import Room from '../../../../src/domain/models/room/Room'
import { v4 as uuidv4 } from 'uuid'
import RoomRepositoryMock from '../../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import AWSManagerMock from '../../../../__mocks__/infrastructure/aws/AWSManager.mock'
describe('tests on class DeleteRoomIfEmptyWhenUserDeletedEventSubscriber', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userId = uuidv4()
  const userId2 = uuidv4()
  const roomCode = Room.generateRoomCode().value
  const room = new Room({ roomCode })

  const event = jest.fn(() => {
    return new UserDeletedEvent(room.id, userId)
  })

  const invalidEvent = jest.fn(() => {
    return new UserDeletedEvent('', '')
  })

  test('should delete the room when the last user disconnects', async () => {
    const cloudServiceMock = new AWSManagerMock()
    const roomRepositoryMock = new RoomRepositoryMock()
    const spyOnDeleteDirectory = jest.spyOn(cloudServiceMock, 'deleteDirectory')
    const spyOnGetRoomById = jest.spyOn(roomRepositoryMock, 'getRoomById')
    const spyOnDeleteRoom = jest.spyOn(roomRepositoryMock, 'delete')
    const spyOnSave = jest.spyOn(roomRepositoryMock, 'save')
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock,
      cloudServiceMock
    )
    const result = jest.fn(() => {
      return subscriber.handleEvent(event())
    })
    await result()
    expect(spyOnGetRoomById).toHaveBeenCalled()
    expect(event).toHaveBeenCalled()
    expect(spyOnDeleteRoom).toHaveBeenCalled()
    expect(spyOnDeleteDirectory).toHaveBeenCalled()
    expect(spyOnSave).not.toHaveBeenCalled()
  })

  test('should disconnect the user without deleting the room', async () => {
    const roomRepositoryMock = new RoomRepositoryMock()
    const cloudServiceMock = new AWSManagerMock()
    const spyOnGetRoomById = jest
      .spyOn(roomRepositoryMock, 'getRoomById')
      .mockImplementation(() => {
        const room = new Room({
          id: null,
          roomCode: Room.generateRoomCode().value
        })
        room.connect(userId)
        room.connect(userId2)
        return Promise.resolve(room)
      })
    const spyOnDeleteRoom = jest.spyOn(roomRepositoryMock, 'delete')
    const spyOnDelete = jest.spyOn(roomRepositoryMock, 'delete')
    const spyOnSave = jest.spyOn(roomRepositoryMock, 'save')
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock,
      cloudServiceMock
    )
    const result = jest.fn(async () => {
      return await subscriber.handleEvent(event())
    })
    await result()
    expect(result).not.toThrow()
    expect(spyOnGetRoomById).toHaveBeenCalled()
    expect(event).toHaveBeenCalled()
    expect(spyOnDelete).not.toHaveBeenCalled()
    expect(spyOnDeleteRoom).not.toHaveBeenCalled()
    expect(spyOnSave).toHaveBeenCalled()
  })

  test('should throw an error when an invalid event is provided', async () => {
    const cloudServiceMock = new AWSManagerMock()
    const roomRepositoryMock = new RoomRepositoryMock()
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock,
      cloudServiceMock
    )
    const result = jest.fn(async () => {
      return await subscriber.handleEvent(invalidEvent())
    })
    await result().catch(error => {
      expect(invalidEvent).toHaveBeenCalled()
    })
    expect(result()).rejects.toThrow()
  })

  test('should throw an error if room does not exist', async () => {
    const cloudServiceMock = new AWSManagerMock()
    const roomRepositoryMock = new RoomRepositoryMock()
    const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
      roomRepositoryMock,
      cloudServiceMock
    )
    const spyOnDeleteDirectory = jest.spyOn(cloudServiceMock, 'deleteDirectory')
    const spyOnGetRoomById = jest
      .spyOn(roomRepositoryMock, 'getRoomById')
      .mockImplementation(roomId => {
        return Promise.resolve(null)
      })
    const spyOnSave = jest.spyOn(roomRepositoryMock, 'save')
    const spyOnDeleteRoom = jest.spyOn(roomRepositoryMock, 'delete')
    const result = jest.fn(async () => {
      return await subscriber.handleEvent(event())
    })
    await result().catch(error => {
      expect(event).toHaveBeenCalled()
      expect(spyOnDeleteRoom).not.toHaveBeenCalled()
      expect(spyOnDeleteDirectory).not.toHaveBeenCalled()
      expect(spyOnSave).not.toHaveBeenCalled()
      expect(spyOnGetRoomById).toHaveBeenCalled()
    })
    expect(result()).rejects.toThrow()
  })
})
