import UserAlreadyInRoomValidation from '../../../src/application/validations/UserAlreadyInRoomValidation'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import User from '../../../src/domain/models/user/User'
import Room from '../../../src/domain/models/room/Room'
import UserError from '../../../src/domain/errors/models/UserError'
import { v4 as uuidv4 } from 'uuid'

describe('tests on class UserAlreadyInRoomValidation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const userRepositoryMock = jest.fn(
    ({
      filled,
      nullPromise = false
    }: {
      filled: boolean
      nullPromise?: boolean
    }) => {
      const roomCode = Room.generateRoomCode().value
      const room = new Room({ roomCode })
      const user = new User({ id: null, username: 'test' })

      if (filled) {
        return {
          getUserById: jest.fn((userId: string) => {
            user.connect(room.id)
            return Promise.resolve(user)
          })
        }
      }
      if (nullPromise && !filled) {
        return {
          getUserById: jest.fn((userId: string) => {
            return Promise.resolve(null)
          })
        }
      }

      return {
        getUserById: jest.fn((userId: string) => {
          return Promise.resolve(user)
        })
      }
    }
  )

  test('should throw an error if the user is null or undefined', async () => {
    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      userRepositoryMock({ filled: false, nullPromise: true }) as any
    )
    const result = jest.fn(async () => {
      return await userAlreadyInRoomValidation.validate(uuidv4())
    })
    expect(result()).rejects.toThrow(new UserError('ERR_USER_NOT_FOUND'))
  })

  test('should throw an error if the user is already in a room', async () => {
    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      userRepositoryMock({ filled: true }) as any
    )
    const result = jest.fn(async () => {
      return await userAlreadyInRoomValidation.validate(uuidv4())
    })
    await result().catch(error => {
      expect(userRepositoryMock).toBeCalledTimes(1)
    })
    expect(result()).rejects.toThrow(new UserError('ERR_USER_ALREADY_IN_ROOM'))
  })

  test('should return null if the user is not in a room', async () => {
    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      userRepositoryMock({ filled: false }) as any
    )
    const result = jest.fn(async () => {
      return await userAlreadyInRoomValidation.validate(uuidv4())
    })
    await result().then(() => {
      expect(userRepositoryMock).toBeCalledTimes(1)
    })
    expect(result()).resolves.toBeNull()
  })
})
