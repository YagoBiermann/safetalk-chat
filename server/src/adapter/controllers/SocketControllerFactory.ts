import ApplicationServiceFactory, {
  ApplicationServices
} from '../../application/services/ApplicationServiceFactory'
import ISocketController from '../ports/controllers/SocketController'
import GetAllUsersFromRoomEventController from './socket/GetAllUsersFromRoom'
import JoinRoomEventController from './socket/JoinRoom'
import SendMessageEventController from './socket/SendMessage'
import UserDisconnectEventController from './socket/UserDisconnect'

export enum SocketControllers {
  GetAllUsersFromRoomEventController = 'GetAllUsersFromRoomEventController',
  JoinRoomEventController = 'JoinRoomEventController',
  SendMessageEventController = 'SendMessageEventController',
  UserDisconnectEventController = 'UserDisconnectEventController'
}

class SocketControllerFactory {
  private static socketControllers = {
    [SocketControllers.GetAllUsersFromRoomEventController]:
      new GetAllUsersFromRoomEventController(),
    [SocketControllers.JoinRoomEventController]: new JoinRoomEventController(),
    [SocketControllers.SendMessageEventController]:
      new SendMessageEventController(
        ApplicationServiceFactory.make(
          ApplicationServices.SaveMessageApplicationService
        )
      ),
    [SocketControllers.UserDisconnectEventController]:
      new UserDisconnectEventController(
        ApplicationServiceFactory.make(
          ApplicationServices.DeleteUserApplicationService
        )
      )
  }

  private constructor() {}

  public static make(socketController: SocketControllers): ISocketController {
    try {
      return SocketControllerFactory.socketControllers[socketController]
    } catch (error) {
      throw new Error(`socket controller ${socketController} not found`)
    }
  }
}

export default SocketControllerFactory
