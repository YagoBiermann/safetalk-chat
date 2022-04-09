import { IAuthenticationInputDTO } from './AuthenticationService'

interface IGetAllUsersFromRoomInputDTO {
  roomId: string
  auth: IAuthenticationInputDTO
}
interface IGetAllUsersFromRoomOutputDTO
  extends Array<{
    userId: string
    username: string
    roomId: string
    roomCode: string
    isOnline: boolean
  }> {}

export { IGetAllUsersFromRoomInputDTO, IGetAllUsersFromRoomOutputDTO }
