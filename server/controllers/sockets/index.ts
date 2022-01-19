import fs from 'fs'
import { Server, Socket } from 'socket.io'
import { RepositoryFactory } from '../../database'
import { IRoomRepository, IUserRepository } from '../../database/interfaces'
import { UserDTO } from '../../services/sockets/interfaces'
import { ValidatorFactory } from '../../services/validations/index'
import {
  IRoomValidator,
  IUserValidator
} from '../../services/validations/interfaces'

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
    this.socket.on('user:data', (user: UserDTO) => {
      console.log(`user: ${this.socket.id} sent data`)
      this.socket.data.user = user
    })
  }

  public onDisconnect() {
    this.socket.on('disconnecting', async () => {
      const roomCode = this.socket.data.user.room.roomCode
      this.socket.to(roomCode).emit('room:users')
      this.userRepository.setStatus({
        id: this.socket.data.user._id,
        isOnline: false
      })
      console.log(
        `user: ${this.socket.id} on room: ${roomCode} has been disconnected`
      )
    })
  }
}

export default SocketEvents
