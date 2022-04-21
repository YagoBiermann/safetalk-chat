import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import AccessKeyValidation from '../../../src/application/validations/AccessKeyValidation'
import RoomAlreadyExistsValidation from '../../../src/application/validations/RoomAlreadyExistsValidation'
import RoomEmptyValidation from '../../../src/application/validations/RoomEmptyValidation'
import RoomNotExistsValidation from '../../../src/application/validations/RoomNotExistsValidation'
import UserAlreadyInRoomValidation from '../../../src/application/validations/UserAlreadyInRoomValidation'
import UsernameTakenValidation from '../../../src/application/validations/UsernameTakenValidation'
import UserNotExistsValidation from '../../../src/application/validations/UserNotExistsValidation'
import ValidationFactory, {
  Validations
} from '../../../src/application/validations/ValidationFactory'

describe('tests on class ValidationFactory', () => {
  test('validation enum should match', () => {
    expect(Validations.UserNotExistsValidation).toBe('UserNotExistsValidation')
    expect(Validations.UsernameTakenValidation).toBe('UsernameTakenValidation')
    expect(Validations.UserAlreadyInRoomValidation).toBe(
      'UserAlreadyInRoomValidation'
    )
    expect(Validations.RoomNotExistsValidation).toBe('RoomNotExistsValidation')
    expect(Validations.RoomEmptyValidation).toBe('RoomEmptyValidation')
    expect(Validations.RoomAlreadyExistsValidation).toBe(
      'RoomAlreadyExistsValidation'
    )
    expect(Validations.AccessKeyValidation).toBe('AccessKeyValidation')
  })

  test('should throw an error if validation not found', async () => {
    const result = jest.fn(() => {
      // @ts-ignore
      ValidationFactory.make('invalidValidation')
    })

    expect(result).toThrow(Error)
  })

  test('should return a validation', () => {
    const validations = jest.fn(() => {
      return {
        UserNotExistsValidation: ValidationFactory.make(
          Validations.UserNotExistsValidation
        ),
        UsernameTakenValidation: ValidationFactory.make(
          Validations.UsernameTakenValidation
        ),
        UserAlreadyInRoomValidation: ValidationFactory.make(
          Validations.UserAlreadyInRoomValidation
        ),
        RoomNotExistsValidation: ValidationFactory.make(
          Validations.RoomNotExistsValidation
        ),
        RoomEmptyValidation: ValidationFactory.make(
          Validations.RoomEmptyValidation
        ),
        RoomAlreadyExistsValidation: ValidationFactory.make(
          Validations.RoomAlreadyExistsValidation
        ),
        AccessKeyValidation: ValidationFactory.make(
          Validations.AccessKeyValidation
        )
      }
    })

    expect(validations().AccessKeyValidation).toBeInstanceOf(
      AccessKeyValidation
    )
    expect(validations().UserNotExistsValidation).toBeInstanceOf(
      UserNotExistsValidation
    )
    expect(validations().UsernameTakenValidation).toBeInstanceOf(
      UsernameTakenValidation
    )
    expect(validations().UserAlreadyInRoomValidation).toBeInstanceOf(
      UserAlreadyInRoomValidation
    )
    expect(validations().RoomNotExistsValidation).toBeInstanceOf(
      RoomNotExistsValidation
    )
    expect(validations().RoomEmptyValidation).toBeInstanceOf(
      RoomEmptyValidation
    )

    expect(validations().RoomAlreadyExistsValidation).toBeInstanceOf(
      RoomAlreadyExistsValidation
    )
  })
})
