import { Socket } from 'socket.io'
import ISocketController from '../../ports/controllers/SocketController'

class JoinRoomEventController implements ISocketController {
  public async handle(socket: Socket): Promise<Socket> {
    return socket.on('room:join', async ({ roomCode }) => {
      console.log(`${socket.id} joined room ${roomCode}`)
      socket.join(roomCode)
    })
  }
}

export default JoinRoomEventController
