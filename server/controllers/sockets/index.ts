import fs from 'fs'
import { Server, Socket } from 'socket.io'
import { RepositoryFactory } from '../../database'
import { IRoomRepository, IUserRepository } from '../../database/interfaces'
import { UserAPI } from '../../services/sockets/interfaces'
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
      console.log(`user: ${this.socket.id} joined room: ${roomCode}`)
      this.socket.join(roomCode)
    })
  }

  public fetchUsers() {
    this.socket.on('room:users', ({ roomCode }) => {
      console.log(
        `user: ${this.socket.id} requested users in room: ${roomCode}`
      )

      this.socket.to(roomCode).emit('room:users')
    })
  }

  public userData() {
    this.socket.on('user:data', (user: UserAPI) => {
      console.log(`user: ${this.socket.id} sent data`)
      this.socket.data = user
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
      //TODO: set user id to socket.data
      console.log(`user: ${this.socket.id} disconnected`)
      const userId = this.socket.data._id
      try {
        const user = await this.userRepository.getUserBy(userId)
        await this.userValidator.checkIfUserExists(userId)
        
        await this.userRepository.deleteUser(userId)

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
