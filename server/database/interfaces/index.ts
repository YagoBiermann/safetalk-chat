import { IRoom } from '../models/rooms'
import { IUser } from '../models/users'
import { ObjectId } from 'mongoose'

interface IRoomRepository {
  createRoom(roomCode: string): Promise<IRoom>
  deleteRoom(roomCode: string): Promise<object>
  getRoomByCode(roomCode: string): Promise<IRoom>
  getRoomByID(id: ObjectId): Promise<IRoom>
  getRooms(): Promise<IRoom[]>
}

interface IUserRepository {
  createUser(user: IUser): Promise<IUser>
  deleteUser(socketID: string): Promise<object>
  getUsersByRoomID(roomID: ObjectId): Promise<IUser[]>
  getUserBySocketID(socketID: string): Promise<IUser>
  getUserByUsername(username: string): Promise<IUser>
  setAsAdmin(socketID: string): Promise<IUser>
  updateUser(user: IUser): Promise<IUser>
}

interface IRepositoryFactory {
  createRoomRepository(): IRoomRepository
  createUserRepository(): IUserRepository
}

export { IRepositoryFactory, IRoomRepository, IUserRepository }
