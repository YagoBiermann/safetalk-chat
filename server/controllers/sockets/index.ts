import { Socket } from 'socket.io'
import { userRepository } from '../../database/index'
import { roomValidator, userValidator } from '../../services/validators/index'
import { roomRepository } from '../../database/index'
import {
  Message,
  AudioMessage,
  FileMessage
} from '../../services/sockets/interfaces'
import fs from 'fs'

class SocketEvents {
  constructor(private socket: Socket) {}
  public sendMessage() {
    this.socket.on('message:text', (message: Message) => {
      this.socket.to(message.roomCode).emit('message:text', message)
    })

    this.socket.on('message:audio', (message: AudioMessage) => {
      this.socket.to(message.roomCode).emit('message:audio', message)
    })

    this.socket.on('message:file', (message: FileMessage) => {
      this.socket.to(message.roomCode).emit('message:file', message)
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
        if (fs.existsSync(`./temp/${roomCode}`)) {
          fs.rmdirSync(`./temp/${roomCode}/`, { recursive: true })
        }
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
