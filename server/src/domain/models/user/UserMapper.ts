import User from './User'
import { IUserRepositoryModel } from './UserRepository'

interface IUserMapper {
  toUserEntity(userModel: IUserRepositoryModel): User
  toUserModel(user: User): IUserRepositoryModel
}

export default IUserMapper
