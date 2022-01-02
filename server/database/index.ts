import { UserRepository } from './repositories/UserRepository'
import { RoomRepository } from './repositories/RoomRepository'
import { IRepositoryFactory } from './interfaces'

class RepositoryFactory implements IRepositoryFactory {
  public createRoomRepository(): RoomRepository {
    return new RoomRepository()
  }

  public createUserRepository(): UserRepository {
    return new UserRepository()
  }
}

export { RepositoryFactory }
