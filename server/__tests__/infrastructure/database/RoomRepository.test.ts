import {
  describe,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  test,
  jest
} from '@jest/globals'
import RoomRepository from '../../../src/infrastructure/database/repositories/RoomRepository'
import { Database } from '../../../src/infrastructure/database/connection'
import RoomMapper from '../../../src/infrastructure/database/mapper/RoomMapper'
import User from '../../../src/domain/models/user/User'
import Room from '../../../src/domain/models/room/Room'
import { User as UserModel } from '../../../src/infrastructure/database/models/users'
import { Room as RoomModel } from '../../../src/infrastructure/database/models/rooms'
import MESSAGE_TYPE from '../../../src/domain/models/room/message/MessageType'

describe('tests on class RoomRepository', () => {
  const roomMapper = new RoomMapper()
  const roomRepository = new RoomRepository(roomMapper)

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

  const roomCode = Room.generateRoomCode().value
  const spyOnSave = jest.spyOn(roomRepository, 'save')
  const spyOnGetRoomById = jest.spyOn(roomRepository, 'getRoomById')
  const spyOnGetRoomByCode = jest.spyOn(roomRepository, 'getRoomByCode')
  const spyOnDelete = jest.spyOn(roomRepository, 'delete')
  const spyOnRoomMapperToModel = jest.spyOn(roomMapper, 'toRoomModel')
  const spyOnRoomMapperToEntity = jest.spyOn(roomMapper, 'toRoomEntity')
  const spyOnUpdate = jest.spyOn(RoomModel, 'findByIdAndUpdate')
  const spyOnDbFindOne = jest.spyOn(RoomModel, 'findOne')
  const spyOnDbFindById = jest.spyOn(RoomModel, 'findById')

  test('should save a new room', async () => {
    const room = new Room({ id: null, roomCode })
    await roomRepository.save(room)

    expect(spyOnRoomMapperToModel).toHaveBeenCalledWith(room)
    expect(spyOnSave).toHaveBeenCalled()
  })

  test('should update the room data if already exists', async () => {
    const room = new Room({ id: null, roomCode })
    const user = new User({ id: null, username: 'test' })
    await roomRepository.save(room)
    room.connect(user.id)
    room.addMessage({
      username: user.username,
      message: 'test',
      createdAt: Date.now(),
      messageType: MESSAGE_TYPE.TEXT,
      roomCode: room.roomCode,
      file: null
    })
    await roomRepository.save(room)

    expect(spyOnGetRoomById).toHaveBeenCalledWith(room.id)
    expect(spyOnRoomMapperToModel).toHaveBeenCalledWith(room)
    expect(spyOnUpdate).toHaveBeenCalled()
    expect(spyOnSave).toHaveBeenCalled()
  })

  test('should get a room by id', async () => {
    const room = new Room({ id: null, roomCode })
    await roomRepository.save(room)
    const savedRoom = await roomRepository.getRoomById(room.id)

    expect(spyOnGetRoomById).toHaveBeenCalledWith(room.id)
    expect(savedRoom).toBeInstanceOf(Room)
    expect(savedRoom.roomCode).toBe(roomCode)
    expect(savedRoom.id).toBe(room.id)
    expect(spyOnGetRoomById).toHaveBeenCalled()
    expect(spyOnRoomMapperToEntity).toHaveBeenCalled()
  })

  test('should get a room by code', async () => {
    const room = new Room({ id: null, roomCode })
    await roomRepository.save(room)
    const savedRoom = await roomRepository.getRoomByCode(room.roomCode)
    expect(spyOnGetRoomByCode).toHaveBeenCalledWith(room.roomCode)

    expect(savedRoom).toBeInstanceOf(Room)
    expect(savedRoom.roomCode).toBe(roomCode)
    expect(savedRoom.id).toBe(room.id)
    expect(spyOnDbFindOne).toHaveBeenCalled()
  })

  test('should delete a room', async () => {
    const room = new Room({ id: null, roomCode })
    await roomRepository.save(room)
    await roomRepository.delete(room.id)
    expect(spyOnDelete).toHaveBeenCalledWith(room.id)
  })

  test('should get a room by id', async () => {
    const room = new Room({ id: null, roomCode })
    await roomRepository.save(room)
    const savedRoom = await roomRepository.getRoomById(room.id)

    expect(spyOnGetRoomById).toHaveBeenCalledWith(room.id)
    expect(savedRoom).toBeInstanceOf(Room)
    expect(savedRoom.roomCode).toBe(roomCode)
    expect(savedRoom.id).toBe(room.id)
    expect(spyOnDbFindById).toHaveBeenCalledWith(room.id)
  })

  test('should return null if room does not exist', async () => {
    const getRoomById = jest.fn(async () => {
      return await roomRepository.getRoomById('123')
    })

    const getRoomByRoomCode = jest.fn(async () => {
      return await roomRepository.getRoomByCode('123')
    })

    await expect(getRoomById()).resolves.toBeNull()
    await expect(getRoomByRoomCode()).resolves.toBeNull()
  })
})
