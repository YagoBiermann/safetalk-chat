import CreateUserController from './CreateUser'
import IController from '../ports/controllers/Controller'
import UserRepositoryFactory from '../../infrastructure/database/repositories/factories/UserRepository'
import AuthenticationFactory from '../../infrastructure/jwt/AuthenticationFactory'
import UsernameTakenValidation from '../../application/validations/leaf/UsernameTakenValidation'
import RoomApplicationService from '../../application/services/RoomApplicationService'
import GenerateRoomCodeController from './GenerateRoomCode'
import UserApplicationService from '../../application/services/UserApplicationService'
import RoomRepositoryFactory from '../../infrastructure/database/repositories/factories/RoomRepository'
import OnUserJoinedRoomSubscriber from '../../domain/models/services/subscribers/OnUserJoinedRoom'
import CreateRoomController from './CreateRoom'
import RoomAlreadyExistsValidation from '../../application/validations/leaf/RoomAlreadyExistsValidation'
import SingleTransaction from '../../infrastructure/database/repositories/SingleTransaction'
import RoomNotExistsValidation from '../../application/validations/leaf/RoomNotExistsValidation'
import JoinRoomController from './JoinRoom'
import UserAlreadyInRoomValidation from '../../application/validations/leaf/UserAlreadyInRoomValidation'
import UserNotExistsValidation from '../../application/validations/leaf/UserNotExistsValidation'
import UserInfoController from './UserInfo'
class ControllerFactory {
  private constructor() {}

  private static userRepository() {
    return UserRepositoryFactory.make()
  }

  private static roomRepository() {
    return RoomRepositoryFactory.make()
  }

  private static authentication() {
    return AuthenticationFactory.make()
  }

  private static _userApplicationService() {
    const usernameTakenValidation = new UsernameTakenValidation(
      this.userRepository()
    )
    const userNotExistsValidation = new UserNotExistsValidation(
      this.userRepository()
    )

    return new UserApplicationService(
      this.userRepository(),
      this.authentication(),
      usernameTakenValidation,
      userNotExistsValidation
    )
  }

  private static _roomApplicationService() {
    const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
      this.roomRepository()
    )

    const roomNotExistsValidation = new RoomNotExistsValidation(
      this.roomRepository()
    )

    const userAlreadyInRoomValidation = new UserAlreadyInRoomValidation(
      this.userRepository()
    )

    const singleTransaction = new SingleTransaction(
      this.roomRepository(),
      this.userRepository()
    )
    const subscriber = new OnUserJoinedRoomSubscriber(
      this.userRepository(),
      singleTransaction
    )
    return new RoomApplicationService(
      this.authentication(),
      roomAlreadyExistsValidation,
      roomNotExistsValidation,
      userAlreadyInRoomValidation,
      this.roomRepository(),
      subscriber
    )
  }

  public static makeCreateUserController(): IController {
    const userApplicationService = ControllerFactory._userApplicationService()

    const createUserController = new CreateUserController(
      userApplicationService
    )

    return createUserController
  }

  public static makeGenerateRoomCodeController(): IController {
    const generateRoomCodeController = new GenerateRoomCodeController(
      ControllerFactory._roomApplicationService()
    )

    return generateRoomCodeController
  }

  public static makeCreateRoomController(): IController {
    const roomApplicationService = ControllerFactory._roomApplicationService()

    const createRoomController = new CreateRoomController(
      roomApplicationService
    )

    return createRoomController
  }

  public static makeJoinRoomController(): IController {
    const roomApplicationService = ControllerFactory._roomApplicationService()
    const joinRoomController = new JoinRoomController(roomApplicationService)

    return joinRoomController
  }

  public static makeUserInfoController(): IController {
    const userApplicationService = ControllerFactory._userApplicationService()

    const userInfoController = new UserInfoController(userApplicationService)
    return userInfoController
  }
}

export default ControllerFactory
