import { describe, expect, test } from '@jest/globals'
import RoomError from '../../../src/domain/errors/models/RoomError'
import { errorMessages } from '../../../src/domain/errors/constants/index'

describe('Tests on class RoomError', () => {
  test('should create an room error with ERR_INVALID_ROOM_CODE', () => {
    const error = new RoomError('ERR_INVALID_ROOM_CODE')
    expect(error.message).toBe(errorMessages.ERR_INVALID_ROOM_CODE.message)
    expect(error.name).toBe(RoomError.name)
    expect(error.code).toBe(errorMessages.ERR_INVALID_ROOM_CODE.code)
  })

  test('should create an room error with ERR_ROOM_CODE_NOT_PROVIDED', () => {
    const error = new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    expect(error.message).toBe(errorMessages.ERR_ROOM_CODE_NOT_PROVIDED.message)
    expect(error.name).toBe(RoomError.name)
    expect(error.code).toBe(errorMessages.ERR_ROOM_CODE_NOT_PROVIDED.code)
  })

  test('should create an room error with ERR_ROOM_FULL', () => {
    const error = new RoomError('ERR_ROOM_FULL')
    expect(error.message).toBe(errorMessages.ERR_ROOM_FULL.message)
    expect(error.name).toBe(RoomError.name)
    expect(error.code).toBe(errorMessages.ERR_ROOM_FULL.code)
  })

  test('should create an room error with ERR_ROOM_NOT_EMPTY', () => {
    const error = new RoomError('ERR_ROOM_NOT_EMPTY')
    expect(error.message).toBe(errorMessages.ERR_ROOM_NOT_EMPTY.message)
    expect(error.name).toBe(RoomError.name)
    expect(error.code).toBe(errorMessages.ERR_ROOM_NOT_EMPTY.code)
  })

  test('should create an room error with ERR_ROOM_NOT_FOUND', () => {
    const error = new RoomError('ERR_ROOM_NOT_FOUND')
    expect(error.message).toBe(errorMessages.ERR_ROOM_NOT_FOUND.message)
    expect(error.name).toBe(RoomError.name)
    expect(error.code).toBe(errorMessages.ERR_ROOM_NOT_FOUND.code)
  })

  test('should create an room error with ERR_ROOM_TAKEN', () => {
    const error = new RoomError('ERR_ROOM_TAKEN')
    expect(error.message).toBe(errorMessages.ERR_ROOM_TAKEN.message)
    expect(error.name).toBe(RoomError.name)
    expect(error.code).toBe(errorMessages.ERR_ROOM_TAKEN.code)
  })
})
