import IUserRepository from '../../../domain/models/user/UserRepository'
import { default as UserEntity } from '../../../domain/models/user/User'
import { User } from '../models/users'
import IUserMapper from '../../../domain/models/user/UserMapper'
import { ClientSession } from 'mongoose'

class UserRepository implements IUserRepository {
  constructor(private userMapper: IUserMapper) {}

  public async save(user: UserEntity, session?: ClientSession): Promise<void> {
    const userModel = this.userMapper.toUserModel(user)
    const userExists = await this.getUserById(user.id)

    if (userExists) {
      await User.findByIdAndUpdate(
        userModel._id,
        { ...userModel },
        { session }
      ).exec()
      console.info(`saving user: ${user.username}`)
      return
    }
    console.info(`creating user: ${user.username}`)
    await new User(userModel).save({ session })
  }

  public async delete(userId: string): Promise<void> {
    console.info(`deleting user: ${userId}`)
    await User.deleteOne({ userId }).exec()
  }

  public async getAllUsernamesFrom(roomId: string): Promise<string[]> {
    const users = await User.find({ roomId }).exec()
    return users.map(user => user.username)
  }

  public async getUserById(userId: string): Promise<UserEntity> {
    const userModel = await User.findById(userId).exec()
    return userModel ? this.userMapper.toUserEntity(userModel) : null
  }

  public async getUserBy(username: string): Promise<UserEntity> {
    const userModel = await User.findOne({ username }).exec()

    return userModel ? this.userMapper.toUserEntity(userModel) : null
  }
}

export default UserRepository
