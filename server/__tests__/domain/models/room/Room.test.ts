import Room from '../../../../src/domain/models/room/Room'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import RoomError from '../../../../src/domain/errors/models/RoomError'
import UserError from '../../../../src/domain/errors/models/UserError'
import IMessageDTO, {
  IFileMetaData
} from '../../../../src/domain/models/room/message/MessageDTO'
import MESSAGE_TYPE from '../../../../src/domain/models/room/message/MessageType'
import Message from '../../../../src/domain/models/room/message/Message'

class MessageMock {
  private _id: string
  private _username: string
  private _roomCode: string
  private _content: string
  private _type: MESSAGE_TYPE
  private _creationTime: number
  private _file?: IFileMetaData

  public constructor(message: IMessageDTO) {
    this._id = message.messageId || uuidv4()
    this._roomCode = message.roomCode
    this._username = message.username
    this._content = message.message
    this._type = message.messageType
    this._creationTime = message.createdAt
    this._file = message.file || null
  }

  public get id(): string {
    return this._id
  }

  public get username(): string {
    return this._username
  }

  public get content(): string {
    return this._content
  }

  public get type(): MESSAGE_TYPE {
    return this._type
  }

  public get creationTime(): number {
    return this._creationTime
  }

  public get file(): IFileMetaData | null {
    return this._file
  }

  public get roomCode(): string {
    return this._roomCode
  }
}

jest.mock('../../../../src/domain/models/room/message/Message', () => {
  return jest.fn((message: IMessageDTO) => {
    return new MessageMock(message)
  })
})

describe('Tests on room aggregate root', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should create a room with new id', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    expect(room.roomCode).toBe(roomCode)
    expect(room.id).toBeDefined()
  })

  test('should create a room with existing id', () => {
    const roomCode = Room.generateRoomCode().value
    const roomId = uuidv4()
    const room = new Room({ id: roomId, roomCode })

    expect(room.roomCode).toBe(roomCode)
    expect(room.id).toBe(roomId)
  })

  test('should connect a user to a room', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    const userId = uuidv4()
    room.connect(userId)

    expect(room.users).toContain(userId)
  })

  test('should not have repetead user id', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    const userId = uuidv4()
    room.connect(userId)
    room.connect(userId)

    expect(room.users.length).toBe(1)
  })

  test('should throw an error when connect more than 20 users', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    const roomMock = jest.fn(() => {
      for (let i = 0; i < 25; i++) {
        const userId = uuidv4()
        room.connect(userId)
      }
    })
    expect(roomMock).toThrowError(new RoomError('ERR_ROOM_FULL'))
  })

  test('should generate a room code', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })

    expect(room.roomCode).toBe(roomCode)
  })

  test('should disconnect a user from a room', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    const userId = uuidv4()
    room.connect(userId)
    room.disconnect(userId)

    expect(room.users).not.toContain(userId)
  })

  test('should throw an error when disconnect a user that is not connected', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    const userId = uuidv4()
    const roomMock = jest.fn(() => {
      room.disconnect(userId)
    })
    expect(roomMock).toThrowError(new UserError('ERR_USER_NOT_FOUND'))
  })

  test("should throw an error if userId wasn't provided to disconnect method", () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    const roomMock = jest.fn(() => {
      room.disconnect(undefined)
    })
    expect(roomMock).toThrowError(new UserError('ERR_USER_NOT_FOUND'))
  })

  test('should add a message to a room', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })
    const message: IMessageDTO = {
      createdAt: Date.now(),
      message: 'hello world',
      messageType: MESSAGE_TYPE.TEXT,
      messageId: uuidv4(),
      file: null,
      roomCode,
      username: 'test'
    }

    room.addMessage(message)
    expect(room.messages[0]).toEqual(message)
    expect(Message).toHaveBeenCalledTimes(1)
  })

  test('should return the last message', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })

    for (let i = 0; i < 10; i++) {
      const message: IMessageDTO = {
        createdAt: Date.now(),
        message: `hello world, message ${i}`,
        messageType: MESSAGE_TYPE.TEXT,
        messageId: uuidv4(),
        file: null,
        roomCode,
        username: `test-${i}`
      }
      room.addMessage(message)
    }

    expect(room.lastMessage()).toEqual(room.messages[9])
  })

  test('should return all messages from room', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })

    for (let i = 0; i < 10; i++) {
      const message: IMessageDTO = {
        createdAt: Date.now(),
        message: `hello world, message ${i}`,
        messageType: MESSAGE_TYPE.TEXT,
        messageId: uuidv4(),
        file: null,
        roomCode,
        username: `test-${i}`
      }
      room.addMessage(message)
      expect(room.messages[i]).toEqual(message)
    }
    expect(room.messages).toHaveLength(10)
  })

  test('should return room id', () => {
    const roomCode = Room.generateRoomCode().value
    const roomId = uuidv4()
    const room = new Room({ roomCode, id: roomId })

    expect(room.id).toBe(roomId)
  })

  test('should return room code', () => {
    const roomCode = Room.generateRoomCode().value
    const room = new Room({ roomCode })

    expect(room.roomCode).toBe(roomCode)
  })
})
