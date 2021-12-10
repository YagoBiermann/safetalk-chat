import { IRoom } from '../models/rooms'
import { IUser } from '../models/users'
import { ObjectId } from 'mongoose'

interface IRoomRepository {
  createRoom(roomCode: string): Promise<IRoom>
  deleteRoom(roomCode: string): Promise<object>
  getRoomByCode(roomCode: string): Promise<IRoom>
}

interface IUserRepository {
  createUser(user: IUser): Promise<IUser>
  deleteUser(socketID: string): Promise<object>
  getUsersByRoomID(roomID: ObjectId): Promise<IUser[]>
  getUserBySocketID(socketID: string): Promise<IUser>
  getUserByUsername(username: string): Promise<IUser>
}

export { IRoomRepository, IUserRepository }
