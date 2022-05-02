import ApplicationServiceFactory, {
  ApplicationServices
} from '../../../src/application/services/ApplicationServiceFactory'
import { describe, expect, beforeEach, test, jest } from '@jest/globals'
import CreateRoomApplicationService from '../../../src/application/services/CreateRoomApplicationService'
import CreateUserApplicationService from '../../../src/application/services/CreateUserApplicationService'
import DeleteUserApplicationService from '../../../src/application/services/DeleteUserApplicationService'
import GetAllUsersFromRoomApplicationService from '../../../src/application/services/GetAllUsersFromRoomApplicationService'
import GenerateRoomCodeApplicationService from '../../../src/application/services/GenerateRoomCodeApplicationService'
import JoinRoomApplicationService from '../../../src/application/services/JoinRoomApplicationService'
import SaveMessageApplicationService from '../../../src/application/services/SaveMessageApplicationService'
import UserInfoApplicationService from '../../../src/application/services/UserInfoApplicationService'

describe('tests on class ApplicationServiceFactory', () => {
  test('should create an instance of CreateRoomApplicationService', () => {
    const createRoom = ApplicationServiceFactory.make(
      ApplicationServices.CreateRoomApplicationService
    )
    expect(createRoom).toBeInstanceOf(CreateRoomApplicationService)
  })
  test('should create an instance of CreateUserApplicationService', () => {
    const createUser = ApplicationServiceFactory.make(
      ApplicationServices.CreateUserApplicationService
    )
    expect(createUser).toBeInstanceOf(CreateUserApplicationService)
  })
  test('should create an instance of DeleteUserApplicationService', () => {
    const deleteUser = ApplicationServiceFactory.make(
      ApplicationServices.DeleteUserApplicationService
    )
    expect(deleteUser).toBeInstanceOf(DeleteUserApplicationService)
  })
  test('should create an instance of GetAllUsersFromRoomApplicationService', () => {
    const getAllUsersFromRoom = ApplicationServiceFactory.make(
      ApplicationServices.GetAllUsersFromRoomApplicationService
    )
    expect(getAllUsersFromRoom).toBeInstanceOf(
      GetAllUsersFromRoomApplicationService
    )
  })
  test('should create an instance of GenerateRoomCodeApplicationService', () => {
    const generateRoomCode = ApplicationServiceFactory.make(
      ApplicationServices.GenerateRoomCodeApplicationService
    )
    expect(generateRoomCode).toBeInstanceOf(GenerateRoomCodeApplicationService)
  })
  test('should create an instance of JoinRoomApplicationService', () => {
    const joinRoom = ApplicationServiceFactory.make(
      ApplicationServices.JoinRoomApplicationService
    )
    expect(joinRoom).toBeInstanceOf(JoinRoomApplicationService)
  })
  test('should create an instance of SaveMessageApplicationService', () => {
    const saveMessage = ApplicationServiceFactory.make(
      ApplicationServices.SaveMessageApplicationService
    )
    expect(saveMessage).toBeInstanceOf(SaveMessageApplicationService)
  })
  test('should create an instance of UserInfoApplicationService', () => {
    const userInfo = ApplicationServiceFactory.make(
      ApplicationServices.UserInfoApplicationService
    )
    expect(userInfo).toBeInstanceOf(UserInfoApplicationService)
  })

  test('should throw an error when trying to make an unknown service', () => {
    const result = jest.fn(() => {
      //@ts-ignore
      return ApplicationServiceFactory.make(undefined)
    })
    expect(result).toThrow()
  })
})
