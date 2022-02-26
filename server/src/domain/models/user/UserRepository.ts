import User from './User'

interface IUserRepositoryModel {
  _id: string
  username: string
  room?: string
  isOnline: boolean
}

interface IUserRepository {
  save(user: User): Promise<void>
  getUserById(userId: string): Promise<User>
  getUserBy(username: string): Promise<User>
  getAllUsernamesFrom(roomId: string): Promise<string[]>
  delete(userId: string): Promise<void>
  create(user: User): Promise<void>
}

export default IUserRepository
export { IUserRepositoryModel }
