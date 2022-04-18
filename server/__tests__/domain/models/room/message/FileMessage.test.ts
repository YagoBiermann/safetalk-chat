import { describe, expect, test } from '@jest/globals'
import FileMessage from '../../../../../src/domain/models/room/message/FileMessage'

describe('Tests on class FileMessage', () => {
  test('Should create a file message', () => {
    const fileMessage = new FileMessage(
      'http://localhost:3000/file/1',
      'file.txt',
      'text/plain',
      100
    )
    expect(fileMessage.url).toBe('http://localhost:3000/file/1')
    expect(fileMessage.name).toBe('file.txt')
    expect(fileMessage.type).toBe('text/plain')
    expect(fileMessage.size).toBe(100)
  })
})
