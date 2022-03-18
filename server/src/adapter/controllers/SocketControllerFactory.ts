import { IUserApplicationService } from '../../application/ports/services/UserApplicationService'
import ApplicationServiceFactory from '../../application/services/ApplicationServiceFactory'
import ISocketController from '../ports/controllers/SocketController'
import GetAllUsersFromRoomEventController from './socket/GetAllUsersFromRoom'
import JoinRoomEventController from './socket/JoinRoom'
import UserDisconnectEventController from './socket/UserDisconnect'

class SocketControllerFactory {
  private constructor() {}

  private static userApplicationService(): IUserApplicationService {
    return ApplicationServiceFactory.makeUserApplicationService()
  }

  public static makeJoinRoomEventController(): ISocketController {
    const joinRoomEventController = new JoinRoomEventController()

    return joinRoomEventController
  }

  public static makeGetAllUsersFromRoomEventController(): ISocketController {
    const getAllUsersFromRoomEventController =
      new GetAllUsersFromRoomEventController()

    return getAllUsersFromRoomEventController
  }

  public static makeUserDisconnectEventController(): ISocketController {
    const userDisconnectEventController = new UserDisconnectEventController(
      this.userApplicationService()
    )

    return userDisconnectEventController
  }
}

export default SocketControllerFactory
