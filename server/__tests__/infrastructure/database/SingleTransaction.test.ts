import {
  describe,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  test,
  jest
} from '@jest/globals'
import UserRepository from '../../../src/infrastructure/database/repositories/UserRepository'
import RoomRepository from '../../../src/infrastructure/database/repositories/RoomRepository'
import { Database } from '../../../src/infrastructure/database/connection'
import UserMapper from '../../../src/infrastructure/database/mapper/UserMapper'
import RoomMapper from '../../../src/infrastructure/database/mapper/RoomMapper'
import User from '../../../src/domain/models/user/User'
import Room from '../../../src/domain/models/room/Room'
import { User as UserModel } from '../../../src/infrastructure/database/models/users'
import { Room as RoomModel } from '../../../src/infrastructure/database/models/rooms'
import SingleTransaction from '../../../src/infrastructure/database/repositories/SingleTransaction'

describe('tests on class SingleTransaction', () => {
  const userMapper = new UserMapper()
  const roomMapper = new RoomMapper()
  const userRepository = new UserRepository(userMapper)
  const roomRepository = new RoomRepository(roomMapper)
  const singleTransaction = new SingleTransaction(
    roomRepository,
    userRepository
  )

  beforeAll(async () => {
    await Database.instance().connect(process.env.MONGO_URI)
  })

  afterAll(async () => {
    await Database.instance().disconnect()
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await RoomModel.deleteMany({})
    jest.clearAllMocks()
  })

  const spyOnRoomRepositorySave = jest.spyOn(roomRepository, 'save')
  const spyOnUserRepositorySave = jest.spyOn(userRepository, 'save')
  const spyOnStartTransaction = jest.spyOn(
    Database.instance(),
    'startTransaction'
  )
  const spyOnCommitTransaction = jest.spyOn(
    Database.instance(),
    'commitTransaction'
  )
  const spyOnAbortTransaction = jest.spyOn(
    Database.instance(),
    'abortTransaction'
  )
  const spyOnSession = jest.spyOn(Database.instance(), 'session')

  test('should save all', async () => {
    const user = new User({ id: null, username: 'JohnDoe' })
    const room = new Room({ id: null, roomCode: Room.generateRoomCode().value })
    await singleTransaction.saveAll(user, room)
    expect(spyOnRoomRepositorySave).toHaveBeenCalled()
    expect(spyOnUserRepositorySave).toHaveBeenCalled()
    expect(spyOnStartTransaction).toHaveBeenCalled()
    expect(spyOnCommitTransaction).toHaveBeenCalled()
    expect(spyOnAbortTransaction).not.toHaveBeenCalled()
    expect(spyOnSession).toHaveBeenCalled()
  })

  test('should abort the transaction', async () => {
    const user = new User({ id: null, username: 'JohnDoe' })
    const result = jest.fn(async () => {
      // @ts-ignore
      return await singleTransaction.saveAll(user, 'error')
    })
    await result().catch(() => {
      expect(spyOnStartTransaction).toHaveBeenCalled()
      expect(spyOnCommitTransaction).not.toHaveBeenCalled()
      expect(spyOnAbortTransaction).toHaveBeenCalled()
      expect(spyOnSession).toHaveBeenCalled()
      expect(spyOnRoomRepositorySave).toHaveBeenCalled()
      expect(spyOnUserRepositorySave).not.toHaveBeenCalled()
    })
  })
})
