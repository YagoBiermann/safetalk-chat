import CreateUserController from './express/CreateUser'
import IRouteController from '../ports/controllers/RouteController'
import GenerateRoomCodeController from './express/GenerateRoomCode'
import CreateRoomController from './express/CreateRoom'
import JoinRoomController from './express/JoinRoom'
import UserInfoController from './express/UserInfo'
import ApplicationServiceFactory from '../../application/services/ApplicationServiceFactory'
import GetAllUsersFromRoomController from './express/GetAllUsersFromRoom'
class ExpressControllerFactory {
  private constructor() {}

  private static _userApplicationService() {
    return ApplicationServiceFactory.makeUserApplicationService()
  }

  private static _roomApplicationService() {
    return ApplicationServiceFactory.makeRoomApplicationService()
  }

  public static makeCreateUserController(): IRouteController {
    const userApplicationService =
      ExpressControllerFactory._userApplicationService()

    const createUserController = new CreateUserController(
      userApplicationService
    )

    return createUserController
  }

  public static makeGenerateRoomCodeController(): IRouteController {
    const generateRoomCodeController = new GenerateRoomCodeController(
      ExpressControllerFactory._roomApplicationService()
    )

    return generateRoomCodeController
  }

  public static makeCreateRoomController(): IRouteController {
    const roomApplicationService =
      ExpressControllerFactory._roomApplicationService()

    const createRoomController = new CreateRoomController(
      roomApplicationService
    )

    return createRoomController
  }

  public static makeJoinRoomController(): IRouteController {
    const roomApplicationService =
      ExpressControllerFactory._roomApplicationService()
    const joinRoomController = new JoinRoomController(roomApplicationService)

    return joinRoomController
  }

  public static makeUserInfoController(): IRouteController {
    const userApplicationService =
      ExpressControllerFactory._userApplicationService()

    const userInfoController = new UserInfoController(userApplicationService)
    return userInfoController
  }

  public static makeGetAllUsersFromRoomController(): IRouteController {
    const roomApplicationService = this._roomApplicationService()
    const getAllUsersFromRoomController = new GetAllUsersFromRoomController(
      roomApplicationService
    )

    return getAllUsersFromRoomController
  }
}

export default ExpressControllerFactory
