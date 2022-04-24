import ChangeUserStatusWhenJoinedRoomEventSubscriber from '../../../../src/application/subscribers/userJoinedRoom/ChangeStatusWhenUserJoinedRoomEventSubscriber'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import UserJoinedRoomEvent from '../../../../src/domain/events/UserJoinedRoomEvent'
import Room from '../../../../src/domain/models/room/Room'
import User from '../../../../src/domain/models/user/User'
import UserRepositoryMock from '../../../../__mocks__/infrastructure/Database/UserRepository.mock'
import SingleTransactionMock from '../../../../__mocks__/infrastructure/Database/SingleTransaction.mock'

describe('tests on class ChangeUserStatusWhenJoinedRoomEventSubscriber', () => {
  const userId = uuidv4()
  const roomMock = jest.fn(() => {
    const roomCode = Room.generateRoomCode().value
    return new Room({ roomCode })
  })
  const user = new User({ id: userId, username: 'user' })

  const event = new UserJoinedRoomEvent(roomMock(), user.id)
  //@ts-ignore
  const invalidEvent = new UserJoinedRoomEvent('', '')
  test('should connect the user and save the transaction', async () => {
    const singleTransactionMock = new SingleTransactionMock()
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnUserConnect = jest.spyOn(User.prototype, 'connect')
    const spyOnGetUserById = jest.spyOn(userRepositoryMock, 'getUserById')
    const spyOnSaveAll = jest.spyOn(singleTransactionMock, 'saveAll')
    const subscriber = new ChangeUserStatusWhenJoinedRoomEventSubscriber(
      userRepositoryMock,
      singleTransactionMock
    )

    const result = jest.fn(async () => {
      return await subscriber.handleEvent(event)
    })
    await result().then(() => {
      expect(spyOnGetUserById).toHaveBeenCalled()
      expect(spyOnSaveAll).toHaveBeenCalled()
      expect(spyOnUserConnect).toHaveBeenCalled()
    })

    expect(result()).resolves.not.toThrow()
  })

  test('should throw an error if the event is not valid', async () => {
    const singleTransactionMock = new SingleTransactionMock()
    const userRepositoryMock = new UserRepositoryMock()
    const spyOnGetUserById = jest.spyOn(userRepositoryMock, 'getUserById')
    const spyOnSaveAll = jest.spyOn(singleTransactionMock, 'saveAll')
    const subscriber = new ChangeUserStatusWhenJoinedRoomEventSubscriber(
      userRepositoryMock,
      singleTransactionMock
    )

    const result = jest.fn(async () => {
      return await subscriber.handleEvent(invalidEvent)
    })
    await result().catch(() => {
      expect(spyOnGetUserById).not.toHaveBeenCalled()
      expect(spyOnSaveAll).not.toHaveBeenCalled()
    })

    expect(result()).rejects.toThrow()
  })
})
