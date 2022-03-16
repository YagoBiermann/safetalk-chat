import { Socket } from 'socket.io'
import ISocketController from '../../ports/controllers/SocketController'

class GetAllUsersFromRoomEventController implements ISocketController {
  public async handle(socket: Socket): Promise<Socket> {
    return socket.on('room:allUsers', async ({ roomCode }) => {
      socket.to(roomCode).emit('room:allUsers')
    })
  }
}

export default GetAllUsersFromRoomEventController
