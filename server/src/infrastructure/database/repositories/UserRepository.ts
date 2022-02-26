import IUserRepository from '../../../domain/models/user/UserRepository'
import { default as UserEntity } from '../../../domain/models/user/User'
import { User } from '../models/users'
import IUserMapper from '../../../domain/models/user/UserMapper'

class UserRepository implements IUserRepository {
  constructor(private userMapper: IUserMapper) {}

  public async save(user: UserEntity): Promise<void> {
    const userModel = this.userMapper.toUserModel(user)
    await User.findOneAndUpdate({ _id: userModel._id }, userModel).exec()
  }

  public async create(user: UserEntity): Promise<void> {
    console.info(`creating user: ${user.username}`)
    const userModel = this.userMapper.toUserModel(user)
    await User.create(userModel)
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
