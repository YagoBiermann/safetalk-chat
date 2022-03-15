import { Server, Socket } from 'socket.io'

export default interface ISocketController {
  handle(socket: Socket): Promise<Socket>
}
