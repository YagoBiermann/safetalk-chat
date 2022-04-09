import { ClientSession } from 'mongoose'
import { IFileMetaData } from './message/MessageDTO'
import Room from './Room'

interface IRoomRepositoryModel<UserId = string> {
  _id: string
  roomCode: string
  messages: Array<IMessageRepositoryModel>
  users: Array<UserId>
}

interface IMessageRepositoryModel {
  _id?: string
  username: string
  roomCode: string
  message: string
  messageType: string
  createdAt: number
  file?: IFileMetaData
}

interface IRoomRepository {
  save(room: Room, session?: ClientSession): Promise<void>
  delete(roomId: string): Promise<void>
  getRoomByCode(roomCode: string): Promise<Room | null>
  getRoomById(roomId: string): Promise<Room | null>
}

export { IRoomRepository, IMessageRepositoryModel, IRoomRepositoryModel }
