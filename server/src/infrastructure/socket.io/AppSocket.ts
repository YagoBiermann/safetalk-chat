import { Server } from 'socket.io'
import { createServer } from 'http'
import ISocketController from '../../adapter/ports/controllers/SocketController'

class AppSocket {
  private _io: Server
  private _httpServer = createServer()
  private controllers: Array<ISocketController> = []
  constructor() {
    this._io = new Server(this._httpServer, {
      path: '/socket.io',
      cookie: true
    })
  }

  public addController(controller: ISocketController) {
    this.controllers.push(controller)
  }

  public exec() {
    this._io.of('chat').on('connection', socket => {
      this.controllers.forEach(controller => controller.handle(socket))
    })
  }

  public run() {
    this._httpServer.listen(5500)
  }
}

export default AppSocket
