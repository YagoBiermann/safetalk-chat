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
        if (fs.existsSync(`./temp/${roomCode}`)) {
          fs.rmdirSync(`./temp/${roomCode}/`, { recursive: true })
        }
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
