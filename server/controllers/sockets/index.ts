import { Socket } from 'socket.io'
import { userRepository } from '../../database/index'
import { roomValidator, userValidator } from '../../services/validators/index'
import { roomRepository } from '../../database/index'
import { IMessage } from '../../services/sockets/interfaces'

class SocketEvents {
  constructor(private socket: Socket) {}
  public sendMessage() {
    this.socket.on('message', (message: IMessage) => {
      this.socket.to(message.roomCode).emit('message', message)
    })
  }

  public joinRoom() {
    this.socket.on('room:join', ({ roomCode }) => {
      this.socket.join(roomCode)
    })
  }

  public deleteRoom() {
    this.socket.on('disconnecting', async () => {
      const roomCode = [...this.socket.rooms][1]

      if (!roomCode) return

      try {
        await roomValidator.checkIfRoomDoesNotExists(roomCode)
        await roomValidator.checkIfRoomIsNotEmpty(roomCode)
        await roomRepository.deleteRoom(roomCode)
      } catch (error) {
        console.error(error.message)
      }
    })
  }

  public deleteUser() {
    this.socket.on('disconnect', async () => {
      try {
        await userValidator.checkIfUserExists(this.socket.id)
        await userRepository.deleteUser(this.socket.id)
      } catch (error) {
        console.error(error)
      }
    })
  }
}

export default SocketEvents
