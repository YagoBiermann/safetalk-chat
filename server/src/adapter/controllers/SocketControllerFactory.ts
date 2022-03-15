import ISocketController from '../ports/controllers/SocketController'
import JoinRoomEventController from './socket/JoinRoom'

class SocketControllerFactory {
  private constructor() {}

  public static makeJoinRoomEventController(): ISocketController {
    const joinRoomEventController = new JoinRoomEventController()

    return joinRoomEventController
  }
}

export default SocketControllerFactory
