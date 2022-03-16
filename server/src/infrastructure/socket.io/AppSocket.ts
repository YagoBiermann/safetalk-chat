import { Server } from 'socket.io'
import { Server as httpServer } from 'http'
import ISocketController from '../../adapter/ports/controllers/SocketController'

class AppSocket {
  private _io: Server
  private controllers: Array<ISocketController> = []
  constructor(private _httpServer: httpServer) {
    this._io = new Server(this._httpServer, {
      path: '/socket.io',
      cookie: true,
      cors: { origin: '*' },
      transports: ['websocket', 'polling']
    })
  }

  public addController(controller: ISocketController) {
    this.controllers.push(controller)
  }

  public exec() {
    this._io.of('chat').on('connection', socket => {
      console.log('Socket.io connection established')
      this.controllers.forEach(controller => controller.handle(socket))
    })
  }
}

export default AppSocket
