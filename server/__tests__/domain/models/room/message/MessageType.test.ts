import { describe, expect, test } from '@jest/globals'
import MessageType from '../../../../../src/domain/models/room/message/MessageType'

describe('Tests on enum MessageType', () => {
  expect(MessageType.TEXT).toBe('TEXT')
  expect(MessageType.FILE).toBe('FILE')
  expect(MessageType.AUDIO).toBe('AUDIO')
  expect(MessageType.VIDEO).toBe('VIDEO')
  expect(MessageType.IMAGE).toBe('IMAGE')
})
