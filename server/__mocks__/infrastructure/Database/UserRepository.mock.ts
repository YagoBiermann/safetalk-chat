import User from '../../../src/domain/models/user/User'
import IUserRepository from '../../../src/domain/models/user/UserRepository'

class UserRepositoryMock implements IUserRepository {
  constructor() {}

  public async save(user: User, session?: any): Promise<void> {
    Promise.resolve()
  }

  public async delete(userId: string): Promise<void> {
    Promise.resolve()
  }

  public async getAllUsernamesFrom(roomId: string): Promise<string[]> {
    return Promise.resolve(['user1', 'user2', 'user3'])
  }

  public async getUserById(userId: string): Promise<User> {
    const user = new User({ id: null, username: 'user1' })
    return Promise.resolve(user)
  }
  /**
   * Mock of getUserBy
   * @param username should be 'user1' to return a user
   * @returns User or null
   * @memberof UserRepositoryMock
   */
  public async getUserBy(username: string): Promise<User> {
    if (username === 'user1') {
      const user = new User({ id: null, username: 'user1' })
      return Promise.resolve(user)
    }
    return Promise.resolve(null)
  }
}

export default UserRepositoryMock
