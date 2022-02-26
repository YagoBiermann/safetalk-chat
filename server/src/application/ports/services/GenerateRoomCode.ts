interface IGenerateRoomCodeAppService {
  exec(userId: string, accessKey: string): Promise<IGenerateRoomCodeOutputDTO>
}

interface IGenerateRoomCodeOutputDTO {
  roomCode: string
}
