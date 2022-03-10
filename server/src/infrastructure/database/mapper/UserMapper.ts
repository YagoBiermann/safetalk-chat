import User from '../../../domain/models/user/User'
import IUserMapper from '../../../domain/models/user/UserMapper'
import { IUserRepositoryModel } from '../../../domain/models/user/UserRepository'

class UserMapper implements IUserMapper {
  public toUserEntity(userModel: IUserRepositoryModel): User {
    return new User({
      id: userModel._id,
      username: userModel.username,
      room: userModel.room,
      isOnline: userModel.isOnline
    })
  }

  public toUserModel(user: User): IUserRepositoryModel {
    return {
      _id: user.id,
      username: user.username,
      room: user.room,
      isOnline: user.isOnline
    }
  }
}

export default UserMapper
