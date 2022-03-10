import Room from '../../../domain/models/room/Room'
import User from '../../../domain/models/user/User'
import { IRoomRepository } from '../../../domain/models/room/RoomRepository'
import IUserRepository from '../../../domain/models/user/UserRepository'
import ISingleTransaction from '../../../domain/models/common/SingleTransaction'
import { User as UserModel } from '../../../infrastructure/database/models/users'

class SingleTransaction implements ISingleTransaction {
  public constructor(
    private _roomRepository: IRoomRepository,
    private _userRepository: IUserRepository
  ) {}

  public async saveAll(user: User, room: Room): Promise<void> {
    const session = await UserModel.startSession()
    session.startTransaction()
    try {
      await this._roomRepository.save(room, session)
      await this._userRepository.save(user, session)
      await session.commitTransaction()
      session.endSession()
    } catch (error) {
      await session.abortTransaction()
      session.endSession()
      throw error
    }
  }
}

export default SingleTransaction
