import { Server } from 'socket.io'
import ISocketController from '../../adapter/ports/controllers/SocketController'

class AppSocket {
  private _io: Server
  private controllers: Array<ISocketController> = []
  constructor() {
    this._io = new Server({ path: '/socket.io', cookie: true })
  }

  public addController(controller: ISocketController) {
    this.controllers.push(controller)
  }

  public exec() {
    this._io.on('connection', socket => {
      this.controllers.forEach(controller => controller.handle(socket))
    })
  }

  public run() {
    this._io.listen(5500)
  }
}

export default AppSocket
