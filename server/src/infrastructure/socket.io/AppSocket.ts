import * as http from 'http'
import { Server } from 'socket.io'

class AppSocket {
  private io: Server
  constructor(httpServer: http.Server) {
    this.io = new Server(httpServer, { path: '/socket.io' })
  }

  public run() {
    //TODO: implement socket events
  }
}

export default AppSocket
