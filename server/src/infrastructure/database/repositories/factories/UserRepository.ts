import UserMapper from '../../mapper/UserMapper'
import UserRepository from '../UserRepository'

class UserRepositoryFactory {
  private constructor() {}
  public static make(): UserRepository {
    const userMapper = new UserMapper()
    return new UserRepository(userMapper)
  }
}

export default UserRepositoryFactory
