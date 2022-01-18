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
  createUser(user: Omit<IUser, '_id'>): Promise<IUser>
  deleteUser(id: ObjectId): Promise<object>
  getAllUsers(room: ObjectId): Promise<IUser[]>
  getUserBy(value: string): Promise<IUser>
  getUserById(id: string): Promise<IUser>
  setAsAdmin(id: ObjectId): Promise<IUser>
  updateUser(user: Omit<IUser, '_id'>): Promise<IUser>
}

interface IRepositoryFactory {
  createRoomRepository(): IRoomRepository
  createUserRepository(): IUserRepository
}

export { IRepositoryFactory, IRoomRepository, IUserRepository }
