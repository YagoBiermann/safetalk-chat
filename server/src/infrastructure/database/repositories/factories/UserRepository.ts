import UserMapper from '../../mapper/UserMapper'
import UserRepository from '../UserRepository'

class UserRepositoryFactory {
  make() {
    const userMapper = new UserMapper()
    return new UserRepository(userMapper)
  }
}

export default UserRepositoryFactory
