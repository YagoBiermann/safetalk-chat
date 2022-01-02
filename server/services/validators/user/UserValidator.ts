import { IUserRepository } from '../../../database/interfaces/index'
import AppError from '../../errors/AppError'
import { IUserValidator } from '../interfaces'
class UserValidator implements IUserValidator {
  constructor(private userRepository: IUserRepository) {}

  public async checkIfUsernameIsTaken(username: string): Promise<void> {
    const user = await this.userRepository.getUserByUsername(username)
    if (user) {
      throw new AppError('ERR_USERNAME_TAKEN')
    }
  }

  public async checkIfUserExists(socketID: string): Promise<void> {
    const user = await this.userRepository.getUserBySocketID(socketID)
    if (!user) {
      throw new AppError('ERR_USER_NOT_FOUND')
    }
  }
}

export { UserValidator }
