import { SocketWithSession } from './../../../infrastructure/socket.io/AppSocket'
import { Socket } from 'socket.io'
import ISocketController from '../../ports/controllers/SocketController'
import IApplicationService from '../../../application/ports/services/ApplicationService'
import { IDeleteUserInputDTO } from '../../../application/ports/services/DeleteUserApplicationService'

class UserDisconnectEventController implements ISocketController {
  constructor(
    private deleteUserApplicationService: IApplicationService<
      IDeleteUserInputDTO,
      Promise<null>
    >
  ) {}
  public async handle(socket: SocketWithSession): Promise<Socket> {
    return socket.on('disconnect', async () => {
      try {
        const userId = socket.request.session.user
        const accessKey = socket.request.session.accessKey
        const roomId = socket.request.session.room
        const roomCode = socket.request.session.roomCode
        await this.deleteUserApplicationService.exec({
          accessKey,
          roomId,
          userId
        })
        socket.request.session.destroy(err => {
          console.log(err)
        })
        socket.to(roomCode).emit('room:allUsers')
      } catch (error) {
        console.log(error)
      }
    })
  }
}

export default UserDisconnectEventController
