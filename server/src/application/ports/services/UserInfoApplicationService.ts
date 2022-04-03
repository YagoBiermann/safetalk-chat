import IMessageDTO from '../../../domain/models/room/message/MessageDTO'
import { IAuthenticationInputDTO } from './AuthenticationService'

interface IUserInfoInputDTO extends IAuthenticationInputDTO {}

interface IUserInfoOutputDTO {
  userId: string
  username: string
  isOnline: boolean
  roomCode: string | null
  room: string | null
  messages: Array<IMessageDTO>
}

export { IUserInfoInputDTO, IUserInfoOutputDTO }
