import CreateUserController from './CreateUser'
import IController from '../ports/controllers/Controller'
import UserRepositoryFactory from '../../infrastructure/database/repositories/factories/UserRepository'
import AuthenticationFactory from '../../infrastructure/jwt/AuthenticationFactory'
import UsernameTakenValidation from '../../application/validations/leaf/UsernameTakenValidation'
import RoomApplicationService from '../../application/services/RoomApplicationService'
import GenerateRoomCodeController from './GenerateRoomCode'
import UserApplicationService from '../../application/services/UserApplicationService'
import RoomRepositoryFactory from '../../infrastructure/database/repositories/factories/RoomRepository'
import OnRoomCreatedSubscriber from '../../domain/models/services/subscribers/OnRoomCreated'
import CreateRoomController from './CreateRoom'
import RoomAlreadyExistsValidation from '../../application/validations/leaf/RoomAlreadyExistsValidation'
import SingleTransaction from '../../infrastructure/database/repositories/SingleTransaction'
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
    const createUserValidation = new UsernameTakenValidation(
      this.userRepository()
    )
    return new UserApplicationService(
      this.userRepository(),
      this.authentication(),
      createUserValidation
    )
  }

  private static _roomApplicationService() {
    const roomAlreadyExistsValidation = new RoomAlreadyExistsValidation(
      this.roomRepository()
    )
    
    const singleTransaction = new SingleTransaction(
      this.roomRepository(),
      this.userRepository()
    )
    const subscriber = new OnRoomCreatedSubscriber(
      this.userRepository(),
      singleTransaction
    )
    return new RoomApplicationService(
      this.authentication(),
      roomAlreadyExistsValidation,
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
}

export default ControllerFactory
