import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import Message from '../../../../../src/domain/models/room/message/Message'
import MESSAGE_TYPE from '../../../../../src/domain/models/room/message/MessageType'
import Room from '../../../../../src/domain/models/room/Room'
import { v4 as uuidv4 } from 'uuid'

describe('Tests on class Message', () => {
  test('Should create a text message with id', () => {
    const id = uuidv4()
    const roomCode = Room.generateRoomCode().value
    const createdAt = Date.now()
    const message = new Message({
      messageId: id,
      username: 'user',
      roomCode,
      message: 'message',
      messageType: MESSAGE_TYPE.TEXT,
      createdAt
    })
    expect(message.id).toBe(id)
    expect(message.username).toBe('user')
    expect(message.roomCode).toBe(roomCode)
    expect(message.content).toBe('message')
    expect(message.type).toBe(MESSAGE_TYPE.TEXT)
    expect(message.creationTime).toBe(createdAt)
  })

  test('Should create a text message', () => {
    const roomCode = Room.generateRoomCode().value
    const createdAt = Date.now()
    const message = new Message({
      username: 'user',
      roomCode,
      message: 'message',
      messageType: MESSAGE_TYPE.TEXT,
      createdAt
    })
    expect(message.id).toBeDefined()
    expect(message.username).toBe('user')
    expect(message.roomCode).toBe(roomCode)
    expect(message.content).toBe('message')
    expect(message.type).toBe(MESSAGE_TYPE.TEXT)
    expect(message.creationTime).toBe(createdAt)
  })

  test('Should create a file message', () => {
    const roomCode = Room.generateRoomCode().value
    const createdAt = Date.now()
    const message = new Message({
      username: 'user',
      roomCode,
      message: 'message',
      messageType: MESSAGE_TYPE.FILE,
      createdAt,
      file: {
        url: 'http://localhost:3000/file/1',
        name: 'file.txt',
        type: 'text/plain',
        size: 100
      }
    })
    expect(message.username).toBe('user')
    expect(message.roomCode).toBe(roomCode)
    expect(message.content).toBe('message')
    expect(message.type).toBe(MESSAGE_TYPE.FILE)
    expect(message.creationTime).toBe(createdAt)
    expect(message.file).toEqual({
      name: 'file.txt',
      url: 'http://localhost:3000/file/1',
      type: 'text/plain',
      size: 100
    })
  })
})
