import { ObjectId } from 'mongoose'
import { User, IUser } from '../models/users'
import { IUserRepository } from '../interfaces'

class UserRepository implements IUserRepository {
  public async updateUser(user: IUser): Promise<IUser> {
    return User.findOneAndUpdate(
      { socketID: user.socketID },
      { username: user.username, room: user.room, isAdmin: user.isAdmin }
    )
  }

  public async setAsAdmin(socketID: string): Promise<IUser> {
    return User.findOneAndUpdate({ socketID }, { isAdmin: true }).exec()
  }

  public async createUser(user: IUser): Promise<IUser> {
    console.info(`creating user: ${user.socketID}`)
    return User.create(user)
  }

  public async deleteUser(socketID: string): Promise<object> {
    console.info(`deleting user: ${socketID}`)
    return User.deleteOne({ socketID }).exec()
  }

  public async getUsersByRoomID(roomID: ObjectId): Promise<IUser[]> {
    return User.find({ room: roomID }).exec()
  }

  public async getUserBySocketID(socketID: string): Promise<IUser> {
    return User.findOne({ socketID }).exec()
  }

  public async getUserByUsername(username: string): Promise<IUser> {
    return User.findOne({ username }).exec()
  }
}

export { UserRepository }
