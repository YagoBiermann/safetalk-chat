import { Server, Socket } from 'socket.io'
import SocketEvents from '../../controllers/sockets'
class SocketService {
  private handleEvents: SocketEvents
  constructor(public io: Server) {}

  public connect() {
    this.io.on('connection', async (socket: Socket) => {
      console.log(`user: ${socket.id} connected`)
      this.handleEvents = new SocketEvents(socket, this.io)
      this.handleEvents.joinRoom()
      this.handleEvents.deleteUser()
      this.handleEvents.fetchUsers()
    })
  }
}

export { SocketService }
