import { Server, Socket } from 'socket.io'
import SocketEvents from '../../controllers/sockets'
class SocketService {
  private handleEvents: SocketEvents
  constructor(public io: Server) {}

  private onConnection(socket: Socket) {
    this.handleEvents = new SocketEvents(socket)
    this.handleEvents.joinRoom()
    this.handleEvents.deleteRoom()
    this.handleEvents.deleteUser()
    this.handleEvents.sendMessage()
  }

  public connect() {
    this.io.on('connection', async (socket: Socket) => {
      this.onConnection(socket)
    })
  }
}

export { SocketService }
