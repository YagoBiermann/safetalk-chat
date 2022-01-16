import { ObjectId } from 'mongoose'
import { User, IUser } from '../models/users'
import { IUserRepository } from '../interfaces'

class UserRepository implements IUserRepository {
  public async updateUser(user: IUser): Promise<IUser> {
    return User.findOneAndUpdate(
      { username: user.username },
      { username: user.username, room: user.room, isAdmin: user.isAdmin }
    )
  }

  public async setAsAdmin(id: string): Promise<IUser> {
    return User.findByIdAndUpdate({ id }, { isAdmin: true }).exec()
  }

  public async createUser(user: Omit<IUser, '_id'>): Promise<IUser> {
    console.info(`creating user: ${user.username}`)
    return User.create(user)
  }

  public async deleteUser(id: string): Promise<object> {
    console.info(`deleting user: ${id}`)
    return User.deleteOne({ id }).exec()
  }

  public async getAllUsers(roomID: ObjectId): Promise<IUser[]> {
    return User.find({ room: roomID }).exec()
  }

  public async getUserBy(value: string): Promise<IUser> {
    return User.findOne({ $text: { $search: value } }).exec()
  }
}

export { UserRepository }
