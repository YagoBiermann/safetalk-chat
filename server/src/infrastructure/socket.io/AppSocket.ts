import { Server, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import ISocketController from '../../adapter/ports/controllers/SocketController'
import { RequestHandler } from 'express'
import type { IncomingMessage } from 'http'
import type { SessionData, Session } from 'express-session'

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData & Session
}
export interface SocketWithSession extends Socket {
  request: SessionIncomingMessage
}
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

  public get server(): Server {
    return this._io
  }

  public socketSession(session: RequestHandler) {
    this._io.of('chat').use((socket: SocketWithSession, next: any) => {
      session(socket.request as any, {} as any, next)
    })
  }

  public exec() {
    this._io.of('chat').on('connection', (socket: SocketWithSession) => {
      console.log('Socket.io connection established')
      this.controllers.forEach(controller =>
        controller.handle(socket, this._io)
      )
    })
  }
}

export default AppSocket
