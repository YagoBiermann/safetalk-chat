import { IRoom } from '../models/rooms'
import { IUser } from '../models/users'
import { ObjectId } from 'mongoose'

interface IRoomRepository {
  createRoom(roomCode: string): Promise<IRoom>
  deleteRoom(roomCode: string): Promise<object>
  getRoomByCode(roomCode: string): Promise<IRoom>
  getRoomByID(id: ObjectId | string): Promise<IRoom>
  getRooms(): Promise<IRoom[]>
}

interface IUserRepository {
  createUser(user: Omit<IUser, '_id'>): Promise<IUser>
  deleteUser(id: ObjectId | string): Promise<object>
  getAllUsers(room: ObjectId | string): Promise<IUser[]>
  getUserBy(value: string): Promise<IUser>
  getUserById(id: ObjectId | string): Promise<IUser>
  setAsAdmin(id: ObjectId | string): Promise<IUser>
  setStatus(status: {
    id: ObjectId | string
    isOnline: boolean
  }): Promise<IUser>
  updateUser(user: Omit<IUser, '_id'>): Promise<IUser>
}

interface IRepositoryFactory {
  createRoomRepository(): IRoomRepository
  createUserRepository(): IUserRepository
}

export { IRepositoryFactory, IRoomRepository, IUserRepository }
