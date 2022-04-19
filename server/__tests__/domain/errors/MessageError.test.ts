import { describe, expect, test } from '@jest/globals'
import MessageError from '../../../src/domain/errors/models/MessageError'
import { errorMessages } from '../../../src/domain/errors/constants/index'

describe('Tests on class MessageError', () => {
  test('should create an message error with ERR_MESSAGE_EMPTY', () => {
    const error = new MessageError('ERR_MESSAGE_EMPTY')
    expect(error.message).toBe(errorMessages.ERR_MESSAGE_EMPTY.message)
    expect(error.name).toBe(MessageError.name)
    expect(error.code).toBe(errorMessages.ERR_MESSAGE_EMPTY.code)
  })

  test('should create an message error with ERR_MESSAGE_LENGTH', () => {
    const error = new MessageError('ERR_MESSAGE_LENGTH')
    expect(error.message).toBe(errorMessages.ERR_MESSAGE_LENGTH.message)
    expect(error.name).toBe(MessageError.name)
    expect(error.code).toBe(errorMessages.ERR_MESSAGE_LENGTH.code)
  })
})
