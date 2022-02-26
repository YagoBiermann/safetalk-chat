interface IRoomDTO<MessageId = string, UserId = string> {
  id?: string
  roomCode: string
  messages: Array<MessageId>
  users: Array<UserId>
}

export default IRoomDTO
