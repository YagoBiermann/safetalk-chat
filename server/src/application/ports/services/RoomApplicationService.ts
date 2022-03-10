import { IAuthenticationInputDTO } from '../../../domain/models/auth/AuthenticationService'

interface ICreateRoomInputDTO {
  roomCode: string
  auth: IAuthenticationInputDTO
}

interface IJoinRoomInputDTO {
  roomCode: string
  auth: IAuthenticationInputDTO
}

interface IGenerateRoomCodeOutputDTO {
  roomCode: string
}

interface IRoomApplicationService {
  createRoom(data: ICreateRoomInputDTO): Promise<void>
  joinRoom(data: IJoinRoomInputDTO): Promise<void>
  generateRoomCode(
    auth: IAuthenticationInputDTO
  ): Promise<IGenerateRoomCodeOutputDTO>
}

export {
  IRoomApplicationService,
  ICreateRoomInputDTO,
  IJoinRoomInputDTO,
  IGenerateRoomCodeOutputDTO
}
