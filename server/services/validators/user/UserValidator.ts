import { ERR_USER_NOT_FOUND, ERR_USERNAME_TAKEN } from '../../errors/constants'
import { IUserRepository } from '../../../database/interfaces/index'

class UserValidator {
  constructor(private userRepository: IUserRepository) {}

  public async checkIfUsernameIsTaken(username: string) {
    const user = await this.userRepository.getUserByUsername(username)
    if (user) {
      throw ERR_USERNAME_TAKEN
    }
  }

  public async checkIfUserExists(socketID: string) {
    const user = await this.userRepository.getUserBySocketID(socketID)
    if (!user) {
      throw ERR_USER_NOT_FOUND
    }
  }
}

export { UserValidator }
