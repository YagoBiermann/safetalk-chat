import { Socket } from 'socket.io'
import { SocketWithSession } from '../../../infrastructure/socket.io/AppSocket'
import ISocketController from '../../ports/controllers/SocketController'

class JoinRoomEventController implements ISocketController {
  public async handle(socket: SocketWithSession): Promise<Socket> {
    return socket.on('room:join', async ({ roomCode }) => {
      socket.join(roomCode)
    })
  }
}

export default JoinRoomEventController
