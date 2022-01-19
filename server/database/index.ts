import { UserRepository } from './repositories/UserRepository'
import { RoomRepository } from './repositories/RoomRepository'
import {
  IRepositoryFactory,
  IRoomRepository,
  IUserRepository
} from './interfaces'

class RepositoryFactory implements IRepositoryFactory {
  public createRoomRepository(): IRoomRepository {
    return new RoomRepository()
  }

  public createUserRepository(): IUserRepository {
    return new UserRepository()
  }
}

export { RepositoryFactory }
