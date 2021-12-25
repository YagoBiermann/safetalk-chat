import { IUserRepository } from '../../../database/interfaces/index'
import AppError from '../../errors/AppError'
class UserValidator {
  constructor(private userRepository: IUserRepository) {}

  public async checkIfUsernameIsTaken(username: string) {
    const user = await this.userRepository.getUserByUsername(username)
    if (user) {
      throw new AppError('ERR_USERNAME_TAKEN')
    }
  }

  public async checkIfUserExists(socketID: string) {
    const user = await this.userRepository.getUserBySocketID(socketID)
    if (!user) {
      throw new AppError('ERR_USER_NOT_FOUND')
    }
  }
}

export { UserValidator }
