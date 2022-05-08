import {
  describe,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
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

describe('tests on class UserRepository', () => {
  const userMapper = new UserMapper()
  const roomMapper = new RoomMapper()
  const userRepository = new UserRepository(userMapper)
  const spyOnUserMapper = jest.spyOn(userMapper, 'toUserModel')
  const spyOnSave = jest.spyOn(userRepository, 'save')
  const roomRepository = new RoomRepository(roomMapper)
  beforeEach(async () => {
    await UserModel.deleteMany({})
    jest.clearAllMocks()
  })

  beforeAll(async () => {
    await Database.instance()
      .connect(process.env.MONGO_TEST_URI)
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
  test('should save a new user', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const savedUser = await userRepository.getUserById(user.id)
    expect(savedUser).toBeDefined()
    expect(savedUser.username).toBe('test')
    expect(savedUser.room).toBeUndefined()
    expect(savedUser.id).toBe(user.id)
    expect(savedUser.isOnline).toBe(false)
    expect(spyOnSave).toHaveBeenCalled()
    expect(spyOnUserMapper).toHaveBeenCalledWith(user)
  })

  test('should update an existing user', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const savedUser = await userRepository.getUserById(user.id)
    expect(savedUser).toBeInstanceOf(User)
    expect(savedUser.username).toBe('test')
    expect(savedUser.room).toBeUndefined()
    const roomId = uuidv4()
    const updatedUser = new User({
      id: user.id,
      username: 'test2',
      room: roomId
    })
    await userRepository.save(updatedUser)
    const updatedSavedUser = await userRepository.getUserById(user.id)
    expect(updatedSavedUser).toBeInstanceOf(User)
    expect(updatedSavedUser.username).toBe('test2')
    expect(updatedSavedUser.room).toBe(roomId)
    expect(updatedSavedUser.id).toBe(user.id)
    expect(updatedSavedUser.isOnline).toBe(true)
  })

  test('should get a user by id', async () => {
    const user = new User({ id: null, username: 'test', room: null })
    await userRepository.save(user)
    const savedUser = await userRepository.getUserById(user.id)
    expect(savedUser).toBeInstanceOf(User)
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
