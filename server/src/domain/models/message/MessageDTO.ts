interface IMessageDTO {
  id?: string
  username: string
  roomCode: string
  message: string
  type: string
  createdAt: number
  blob?: string
}

export default IMessageDTO
