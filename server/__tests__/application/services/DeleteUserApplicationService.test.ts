import { describe, expect, beforeEach, test, jest } from '@jest/globals'

import DeleteUserApplicationService from '../../../src/application/services/DeleteUserApplicationService'
import UserRepositoryMock from '../../../__mocks__/infrastructure/Database/UserRepository.mock'
import RoomRepositoryMock from '../../../__mocks__/infrastructure/Database/RoomRepository.mock'
import RoomNotExistsValidation from '../../../src/application/validations/RoomNotExistsValidation'
import DeleteRoomIfEmptyWhenUserDeletedEventSubscriber from '../../../src/application/subscribers/userDeleted/DeleteRoomIfEmptyWhenUserDeletedEventSubscriber'
import AWSManager from '../../../src/infrastructure/aws/AWSManager'
import { v4 as uuidv4 } from 'uuid'
import DomainEventPublisher from '../../../src/domain/models/common/DomainEventPublisher'
import AuthError from '../../../src/domain/errors/models/AuthError'
import UserError from '../../../src/domain/errors/models/UserError'
import AuthenticationFactoryMock from '../../../__mocks__/infrastructure/jwt/AuthenticationFactory'

describe('tests on class DeleteUserApplicationService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const userId = uuidv4()
  const roomId = uuidv4()
  const userRepositoryMock = new UserRepositoryMock()
  const roomRepositoryMock = new RoomRepositoryMock()
  const authentication = AuthenticationFactoryMock.make(userRepositoryMock)
  const accessKey = authentication.generateAccessKey(
    userId,
    process.env.JWT_SECRET,
    '1h'
  )

  const roomNotExistsValidation = new RoomNotExistsValidation(
    roomRepositoryMock
  )
  const cloudService = new AWSManager()
  const subscriber = new DeleteRoomIfEmptyWhenUserDeletedEventSubscriber(
    roomRepositoryMock,
    cloudService
  )

  const deleteUserApplicationService = new DeleteUserApplicationService(
    userRepositoryMock,
    authentication,
    roomNotExistsValidation,
    subscriber
  )
  const spyOnAuthentication = jest.spyOn(authentication, 'authenticate')
  const spyOnUserRepository = jest.spyOn(userRepositoryMock, 'getUserById')
  const spyOnRoomNotExistsValidation = jest.spyOn(
    roomNotExistsValidation,
    'validate'
  )
  const spyOnDeleteUser = jest.spyOn(userRepositoryMock, 'delete')

  const spyOnSubscriber = jest.spyOn(subscriber, 'handleEvent')
  const spyOnPublisher = jest.spyOn(DomainEventPublisher.prototype, 'publish')
  const spyOnPublisherRemoveAllSubscribers = jest.spyOn(
    DomainEventPublisher.prototype,
    'removeAllSubscribers'
  )
  const spyOnPublisherAddSubscriber = jest.spyOn(
    DomainEventPublisher.prototype,
    'addSubscriber'
  )

  test('should delete the user', async () => {
    const result = jest.fn(async () => {
      return await deleteUserApplicationService.exec({
        accessKey,
        userId,
        roomId: null
      })
    })

    await result().then(res => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnPublisherAddSubscriber).toHaveBeenCalled()
      expect(spyOnDeleteUser).toHaveBeenCalled()
      expect(spyOnPublisherRemoveAllSubscribers).toHaveBeenCalled()
      expect(spyOnSubscriber).not.toHaveBeenCalled()
      expect(spyOnRoomNotExistsValidation).not.toHaveBeenCalled()
      expect(spyOnPublisher).not.toHaveBeenCalled()
    })

    expect(result()).resolves.toBeNull()
  })

  test('should delete the user and dispatch the UserDeletedEvent', async () => {
    const result = jest.fn(async () => {
      return await deleteUserApplicationService.exec({
        accessKey,
        userId,
        roomId
      })
    })

    await result().then(res => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnPublisherAddSubscriber).toHaveBeenCalled()
      expect(spyOnDeleteUser).toHaveBeenCalled()
      expect(spyOnPublisherRemoveAllSubscribers).toHaveBeenCalled()
      expect(spyOnSubscriber).toHaveBeenCalled()
      expect(spyOnRoomNotExistsValidation).toHaveBeenCalled()
      expect(spyOnPublisher).toHaveBeenCalled()
    })

    expect(result()).resolves.toBeNull()
  })

  test('should throw an error if the user does not exists', async () => {
    spyOnUserRepository.mockImplementation(() => {
      return Promise.resolve(null)
    })

    const result = jest.fn(async () => {
      return await deleteUserApplicationService.exec({
        accessKey,
        userId,
        roomId
      })
    })

    await result().catch(err => {
      expect(spyOnAuthentication).toHaveBeenCalled()
      expect(spyOnPublisherAddSubscriber).not.toHaveBeenCalled()
      expect(spyOnDeleteUser).not.toHaveBeenCalled()
      expect(spyOnPublisherRemoveAllSubscribers).not.toHaveBeenCalled()
      expect(spyOnSubscriber).not.toHaveBeenCalled()
      expect(spyOnRoomNotExistsValidation).not.toHaveBeenCalled()
      expect(spyOnPublisher).not.toHaveBeenCalled()
    })

    expect(result()).rejects.toThrowError(new AuthError('ERR_NOT_AUTHORIZED'))
  })

  test('should throw an error if null userId was provided', async () => {
    spyOnUserRepository.mockImplementation(() => {
      return Promise.resolve(null)
    })

    const result = jest.fn(async () => {
      return await deleteUserApplicationService.exec({
        accessKey,
        userId: null,
        roomId
      })
    })

    expect(result()).rejects.toThrowError(new UserError('ERR_USER_NOT_FOUND'))
  })
})
