import {
  describe,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  test,
  jest
} from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import UserRepository from '../../../src/infrastructure/database/repositories/UserRepository'
import RoomRepository from '../../../src/infrastructure/database/repositories/RoomRepository'
import { Database } from '../../../src/infrastructure/database/connection'
import UserMapper from '../../../src/infrastructure/database/mapper/UserMapper'
import RoomMapper from '../../../src/infrastructure/database/mapper/RoomMapper'
import User from '../../../src/domain/models/user/User'
import Room from '../../../src/domain/models/room/Room'
import { User as UserModel } from '../../../src/infrastructure/database/models/users'
import { Room as RoomModel } from '../../../src/infrastructure/database/models/rooms'

describe('tests on class UserRepository', () => {
  const userMapper = new UserMapper()
  const roomMapper = new RoomMapper()
  const userRepository = new UserRepository(userMapper)
  const spyOnUserMapperToModel = jest.spyOn(userMapper, 'toUserModel')
  const spyOnUserMapperToEntity = jest.spyOn(userMapper, 'toUserEntity')
  const spyOnRepositorySave = jest.spyOn(userRepository, 'save')
  const roomRepository = new RoomRepository(roomMapper)
  const spyOnUpdate = jest.spyOn(UserModel, 'findByIdAndUpdate')
  const spyOnGetUserById = jest.spyOn(userRepository, 'getUserById')

  beforeAll(async () => {
    await Database.instance()
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB')
      })
  })

  afterAll(async () => {
    await Database.instance()
      .disconnect()
      .then(() => {
        console.log('Disconnected from MongoDB')
      })
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await RoomModel.deleteMany({})
    jest.clearAllMocks()
  })

  test('should save a new user', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    expect(spyOnGetUserById).toHaveBeenCalledWith(user.id)
    expect(spyOnUserMapperToModel).toHaveBeenCalledWith(user)
    expect(spyOnRepositorySave).toHaveBeenCalled()
    expect(spyOnUpdate).not.toHaveBeenCalled()
  })

  test('should update an existing user', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const roomId = uuidv4()
    user.connect(roomId)
    await userRepository.save(user)

    expect(spyOnGetUserById).toHaveBeenCalledWith(user.id)
    expect(spyOnUserMapperToModel).toHaveBeenCalledWith(user)
    expect(spyOnRepositorySave).toHaveBeenCalled()
    expect(spyOnUpdate).toHaveBeenCalled()
  })

  test('should get a user by id', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const savedUser = await userRepository.getUserById(user.id)
    expect(savedUser).toBeInstanceOf(User)
    expect(spyOnUserMapperToEntity).toHaveBeenCalled()
    expect(savedUser.username).toBe('test')
    expect(savedUser.room).toBeUndefined()
    expect(savedUser.id).toBe(user.id)
    expect(savedUser.isOnline).toBe(false)
  })

  test('should get a user by username', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const savedUser = await userRepository.getUserBy(user.username)
    expect(savedUser).toBeInstanceOf(User)
    expect(spyOnUserMapperToEntity).toHaveBeenCalled()
    expect(savedUser.username).toBe('test')
    expect(savedUser.room).toBeUndefined()
    expect(savedUser.id).toBe(user.id)
    expect(savedUser.isOnline).toBe(false)
  })

  test('should delete an user', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const savedUser = await userRepository.getUserById(user.id)
    expect(savedUser).toBeInstanceOf(User)
    await userRepository.delete(user.id)
    const deletedUser = await userRepository.getUserById(user.id)
    expect(deletedUser).toBeNull()
  })

  test('should throw an error when saving an user with an existing username', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const user2 = new User({ id: null, username: 'test', room: null })
    await expect(userRepository.save(user2)).rejects.toThrowError()
  })

  test('should get all usernames from a room', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    const user2 = new User({ id: null, username: 'test2', room: null })
    const room = new Room({ id: null, roomCode: Room.generateRoomCode().value })
    room.connect(user.id)
    room.connect(user2.id)
    user.connect(room.id)
    user2.connect(room.id)

    await userRepository.save(user)
    await userRepository.save(user2)
    await roomRepository.save(room)
    const usernames = await userRepository.getAllUsernamesFrom(room.id)
    expect(usernames).toBeInstanceOf(Array)
    expect(usernames.length).toBe(2)
    expect(usernames[0]).toBe('test')
    expect(usernames[1]).toBe('test2')
  })
})
