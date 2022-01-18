import mongoose, { isValidObjectId, ObjectId } from 'mongoose'
import { User, IUser } from '../models/users'
import { IUserRepository } from '../interfaces'

class UserRepository implements IUserRepository {
  public async updateUser(user: IUser): Promise<IUser> {
    return User.findOneAndUpdate(
      { username: user.username },
      { username: user.username, room: user.room, isAdmin: user.isAdmin }
    )
  }

  public async setAsAdmin(id: ObjectId): Promise<IUser> {
    return User.findByIdAndUpdate({ id }, { isAdmin: true }).exec()
  }

  public async createUser(user: Omit<IUser, '_id'>): Promise<IUser> {
    console.info(`creating user: ${user.username}`)
    return User.create(user)
  }

  public async deleteUser(id: ObjectId): Promise<object> {
    console.info(`deleting user: ${id}`)
    return User.deleteOne({ id }).exec()
  }

  public async getAllUsers(room: ObjectId): Promise<IUser[]> {
    return User.find({ room }).exec()
  }

  public async getUserById(id: string): Promise<IUser> {
    return User.findById(id)
      .populate([{ path: 'room', select: ['_id', 'roomCode'] }])
      .exec()
  }

  public async getUserBy(value: string): Promise<IUser> {
    return User.findOne({ $text: { $search: value } }).exec()
  }
}

export { UserRepository }
