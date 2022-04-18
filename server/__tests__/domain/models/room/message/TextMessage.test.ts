import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import MessageError from '../../../../../src/domain/errors/models/MessageError'
import TextMessage from '../../../../../src/domain/models/room/message/TextMessage'

describe('Tests on class TextMessage', () => {
  test('Should create a text message with id', () => {
    const message = new TextMessage('hello world, this is a test message')

    expect(message.content).toBe('hello world, this is a test message')
  })

  test('Should throw an error if message is greater than 400 characters', () => {
    const invalidMessage = `
    hello world, this is a test message that is greater than 400 characters, 
    hello world, this is a test message that is greater than 400 characters, 
    hello world, this is a test message that is greater than 400 characters, 
    hello world, this is a test message that is greater than 400 characters, 
    hello world, this is a test message that is greater than 400 characters, 
    hello world, this is a test message that is greater than 400 characters, 
    hello world, this is a test message that is greater than 400 characters, 
    hello world, this is a test message that is greater than 400 characters, 
    `
    const mockedMessage = jest.fn(() => {
      return new TextMessage(invalidMessage)
    })

    expect(mockedMessage).toThrowError(new MessageError('ERR_MESSAGE_LENGTH'))
  })
})
