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

interface IGetAllUsersFromRoomInputDTO {
  roomId: string
  auth: IAuthenticationInputDTO
}
interface IGetAllUsersFromRoomOutputDTO
  extends Array<{
    userId: string
    username: string
    room: string
    isOnline: boolean
  }> {}

interface IRoomApplicationService {
  createRoom(data: ICreateRoomInputDTO): Promise<void>
  joinRoom(data: IJoinRoomInputDTO): Promise<void>
  generateRoomCode(
    auth: IAuthenticationInputDTO
  ): Promise<IGenerateRoomCodeOutputDTO>
  getAllUsersFromRoom(
    data: IGetAllUsersFromRoomInputDTO
  ): Promise<IGetAllUsersFromRoomOutputDTO>
}

export {
  IRoomApplicationService,
  ICreateRoomInputDTO,
  IJoinRoomInputDTO,
  IGenerateRoomCodeOutputDTO,
  IGetAllUsersFromRoomInputDTO,
  IGetAllUsersFromRoomOutputDTO
}
