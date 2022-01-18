import { Server, Socket } from 'socket.io'
import SocketEvents from '../../controllers/sockets'
class SocketService {
  private handleEvents: SocketEvents
  constructor(public io: Server) {}

  public connect() {
    this.io.of('/chat').on('connection', async (socket: Socket) => {
      console.log(socket.handshake.headers.cookie)
      console.log(`user: ${socket.id} connected`)
      this.handleEvents = new SocketEvents(socket, this.io)
      this.handleEvents.userData()
      this.handleEvents.joinRoom()
      this.handleEvents.deleteUser()
      this.handleEvents.fetchUsers()
    })
  }
}

export { SocketService }
