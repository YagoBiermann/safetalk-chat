import { Server } from 'socket.io'
import ISocketController from '../../adapter/ports/controllers/SocketController'

class AppSocket {
  private _io: Server
  constructor(private controllers: Array<ISocketController>) {
    this._io = new Server({ path: '/socket.io' })
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
