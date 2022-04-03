import CreateUserController from './express/CreateUser'
import IRouteController from '../ports/controllers/RouteController'
import GenerateRoomCodeController from './express/GenerateRoomCode'
import CreateRoomController from './express/CreateRoom'
import JoinRoomController from './express/JoinRoom'
import UserInfoController from './express/UserInfo'
import ApplicationServiceFactory, {
  ApplicationServices
} from '../../application/services/ApplicationServiceFactory'
import GetAllUsersFromRoomController from './express/GetAllUsersFromRoom'
import UploadFileController from './express/UploadFile'
import AWSManager from '../../infrastructure/aws/AWSManager'
import AuthenticationFactory from '../../infrastructure/jwt/AuthenticationFactory'

export enum ExpressControllers {
  CreateUserController = 'CreateUserController',
  GenerateRoomCodeController = 'GenerateRoomCodeController',
  CreateRoomController = 'CreateRoomController',
  JoinRoomController = 'JoinRoomController',
  UserInfoController = 'UserInfoController',
  GetAllUsersFromRoomController = 'GetAllUsersFromRoomController',
  UploadFileController = 'UploadFileController'
}
class ExpressControllerFactory {
  private static expressControllers = {
    [ExpressControllers.CreateUserController]: new CreateUserController(
      ApplicationServiceFactory.make(
        ApplicationServices.CreateUserApplicationService
      )
    ),
    [ExpressControllers.GenerateRoomCodeController]:
      new GenerateRoomCodeController(
        ApplicationServiceFactory.make(
          ApplicationServices.GenerateRoomCodeApplicationService
        )
      ),
    [ExpressControllers.CreateRoomController]: new CreateRoomController(
      ApplicationServiceFactory.make(
        ApplicationServices.CreateRoomApplicationService
      )
    ),
    [ExpressControllers.JoinRoomController]: new JoinRoomController(
      ApplicationServiceFactory.make(
        ApplicationServices.JoinRoomApplicationService
      )
    ),
    [ExpressControllers.UserInfoController]: new UserInfoController(
      ApplicationServiceFactory.make(
        ApplicationServices.UserInfoApplicationService
      )
    ),
    [ExpressControllers.GetAllUsersFromRoomController]:
      new GetAllUsersFromRoomController(
        ApplicationServiceFactory.make(
          ApplicationServices.GetAllUsersFromRoomApplicationService
        )
      ),
    [ExpressControllers.UploadFileController]: new UploadFileController(
      new AWSManager(),
      AuthenticationFactory.make()
    )
  }

  private constructor() {}

  public static make(expressController: ExpressControllers): IRouteController {
    try {
      return ExpressControllerFactory.expressControllers[expressController]
    } catch (error) {
      throw new Error(`Express controller ${expressController} not found`)
    }
  }
}

export default ExpressControllerFactory
