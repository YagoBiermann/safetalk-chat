import ISocketController from '../ports/controllers/SocketController'
import GetAllUsersFromRoomEventController from './socket/GetAllUsersFromRoom'
import JoinRoomEventController from './socket/JoinRoom'

class SocketControllerFactory {
  private constructor() {}

  public static makeJoinRoomEventController(): ISocketController {
    const joinRoomEventController = new JoinRoomEventController()

    return joinRoomEventController
  }

  public static makeGetAllUsersFromRoomEventController(): ISocketController {
    const getAllUsersFromRoomEventController =
      new GetAllUsersFromRoomEventController()

    return getAllUsersFromRoomEventController
  }
}

export default SocketControllerFactory
