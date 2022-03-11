import { IAuthenticationInputDTO } from './AuthenticationService'

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

interface IAllUsersFromRoomInputDTO {
  roomId: string
  auth: IAuthenticationInputDTO
}
interface IAllUsersFromRoomOutputDTO {
  users: string[]
}

interface IRoomApplicationService {
  createRoom(data: ICreateRoomInputDTO): Promise<void>
  joinRoom(data: IJoinRoomInputDTO): Promise<void>
  generateRoomCode(
    auth: IAuthenticationInputDTO
  ): Promise<IGenerateRoomCodeOutputDTO>
  allUsersFromRoom(
    data: IAllUsersFromRoomInputDTO
  ): Promise<IAllUsersFromRoomOutputDTO>
}

export {
  IRoomApplicationService,
  ICreateRoomInputDTO,
  IJoinRoomInputDTO,
  IGenerateRoomCodeOutputDTO,
  IAllUsersFromRoomInputDTO as allUsersFromRoomInputDTO,
  IAllUsersFromRoomOutputDTO as allUsersFromRoomOutputDTO
}
