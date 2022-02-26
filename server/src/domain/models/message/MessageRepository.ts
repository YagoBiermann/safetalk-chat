import IMessageDTO from './MessageDTO'

interface IMessageRepositoryModel {
  _id?: string
  username: string
  roomCode: string
  message: string
  type: string
  createdAt: number
  blob?: string
}

interface IMessageRepository {
  save(message: IMessageDTO, roomCode: string): Promise<IMessageRepositoryModel>
  getAllMessages(roomCode: string): Promise<IMessageRepositoryModel[]>
}

export default IMessageRepositoryModel
export { IMessageRepository }
