import { Server, Socket } from 'socket.io'
import ISocketController from '../../ports/controllers/SocketController'

class GetAllUsersFromRoomEventController implements ISocketController {
  public async handle(socket: Socket, io: Server): Promise<Socket> {
    return socket.on('room:allUsers', async ({ roomCode }) => {
      io.of('chat').to(roomCode).emit('room:allUsers')
    })
  }
}

export default GetAllUsersFromRoomEventController
