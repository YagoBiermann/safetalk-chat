import CreateUserController from './CreateUser'
import IController from '../ports/controllers/Controller'
import GenerateRoomCodeController from './GenerateRoomCode'
import CreateRoomController from './CreateRoom'
import JoinRoomController from './JoinRoom'
import UserInfoController from './UserInfo'
import ApplicationServiceFactory from '../../application/services/ApplicationServiceFactory'
import GetAllUsersFromRoomController from './GetAllUsersFromRoom'
class ControllerFactory {
  private constructor() {}

  private static _userApplicationService() {
    return ApplicationServiceFactory.makeUserApplicationService()
  }

  private static _roomApplicationService() {
    return ApplicationServiceFactory.makeRoomApplicationService()
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

  public static makeGetAllUsersFromRoomController(): IController {
    const roomApplicationService = this._roomApplicationService()
    const getAllUsersFromRoomController = new GetAllUsersFromRoomController(
      roomApplicationService
    )
    
    return getAllUsersFromRoomController
  }
}

export default ControllerFactory
