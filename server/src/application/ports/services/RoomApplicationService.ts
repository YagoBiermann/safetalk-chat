import { IAuthenticationInputDTO } from '../../../domain/models/auth/AuthenticationService'

interface ICreateRoomInputDTO {
  roomCode: string
  auth: IAuthenticationInputDTO
}

interface IGenerateRoomCodeOutputDTO {
  roomCode: string
}

interface IRoomApplicationService {
  createRoom(data: ICreateRoomInputDTO): Promise<void>
  generateRoomCode(
    auth: IAuthenticationInputDTO
  ): Promise<IGenerateRoomCodeOutputDTO>
}

export {
  IRoomApplicationService,
  ICreateRoomInputDTO,
  IGenerateRoomCodeOutputDTO
}
