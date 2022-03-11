import { IRoomRepository } from '../room/RoomRepository'
import User from '../user/User'
import IUserRepository from '../user/UserRepository'

class AllUsersFromRoomDomainService {
  constructor(
    private roomRepository: IRoomRepository,
    private userRepository: IUserRepository
  ) {}
  public async exec(roomId: string): Promise<User[]> {
    const room = await this.roomRepository.getRoomById(roomId)
    const users = room.users.map(
      async user => await this.userRepository.getUserById(user)
    )
    return Promise.all(users)
  }
}

export default AllUsersFromRoomDomainService
