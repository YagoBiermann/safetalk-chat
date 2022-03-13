import Room from '../../../domain/models/room/Room'
import User from '../../../domain/models/user/User'
import { IRoomRepository } from '../../../domain/models/room/RoomRepository'
import IUserRepository from '../../../domain/models/user/UserRepository'
import ISingleTransaction from '../../../domain/models/common/SingleTransaction'
import { Database } from '../connection'

class SingleTransaction implements ISingleTransaction {
  public constructor(
    private _roomRepository: IRoomRepository,
    private _userRepository: IUserRepository
  ) {}

  public async saveAll(user: User, room: Room): Promise<void> {
    try {
      await Database.instance().session()
      Database.instance().startTransaction()
      await this._roomRepository.save(room, await Database.instance().session())
      await this._userRepository.save(user, await Database.instance().session())
      await Database.instance().commitTransaction()
    } catch (error) {
      await Database.instance().abortTransaction()
      throw error
    }
  }
}

export default SingleTransaction
