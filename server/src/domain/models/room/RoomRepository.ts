interface IRoomRepositoryModel<MessageId = string, UserId = string> {
  _id: string
  roomCode: string
  messages: Array<MessageId>
  users: Array<UserId>
}

interface IRoomRepository {
  createRoom(roomCode: string): Promise<IRoomRepositoryModel | null>
  deleteRoom(roomCode: string): Promise<object>
  getRoomByCode(code: string): Promise<IRoomRepositoryModel | null>
  getRoomById(id: string): Promise<IRoomRepositoryModel | null>
}

export default IRoomRepositoryModel
export { IRoomRepository }
