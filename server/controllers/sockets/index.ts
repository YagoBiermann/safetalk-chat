import fs from 'fs'
import { Server, Socket } from 'socket.io'
import { RepositoryFactory } from '../../database'
import { IRoomRepository, IUserRepository } from '../../database/interfaces'
import { ValidatorFactory } from '../../services/validators/index'
import {
  IRoomValidator,
  IUserValidator
} from '../../services/validators/interfaces'

class SocketEvents {
  private userRepository: IUserRepository
  private roomRepository: IRoomRepository
  private roomValidator: IRoomValidator
  private userValidator: IUserValidator

  constructor(private socket: Socket, private io: Server) {
    this.roomRepository = new RepositoryFactory().createRoomRepository()
    this.userRepository = new RepositoryFactory().createUserRepository()
    this.roomValidator = new ValidatorFactory().createRoomValidator()
    this.userValidator = new ValidatorFactory().createUserValidator()
  }

  public joinRoom() {
    this.socket.on('room:join', ({ roomCode }) => {
      console.log(`user: ${this.socket.data.username} joined room: ${roomCode}`)
      this.socket.join(roomCode)
    })
  }

  public fetchUsers() {
    this.socket.on('room:users', async ({ roomCode }) => {
      console.log(
        `user: ${this.socket.data.username} requested users in room: ${roomCode}`
      )
      this.io.to(roomCode).emit('room:users')
    })
  }

  private async deleteRoom(roomCode: string) {
    if (!roomCode) return

    try {
      await this.roomValidator.checkIfRoomExists(roomCode)
      await this.roomValidator.checkIfRoomIsNotEmpty(roomCode)
      await this.roomRepository.deleteRoom(roomCode)

      if (fs.existsSync(`./temp/${roomCode}`)) {
        console.log('deleting room temp folder')
        fs.rmdirSync(`./temp/${roomCode}/`, { recursive: true })
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  public deleteUser() {
    this.socket.on('disconnecting', async () => {
      console.log(`user: ${this.socket.data.username} disconnected`)
      const username = this.socket.data.username
      try {
        const user = await this.userRepository.getUserBy(username)
        await this.userValidator.checkIfUserExists(username)

        await this.userRepository.deleteUser(username)

        if (user.room) {
          const roomCode = (await this.roomRepository.getRoomByID(user.room))
            .roomCode
          this.socket.to(roomCode).emit('room:users')
          this.deleteRoom(roomCode)
        }
      } catch (error) {
        console.error(error)
      }
    })
  }
}

export default SocketEvents
