import { IAuthenticationInputDTO } from './AuthenticationService'

interface IGenerateRoomCodeInputDTO extends IAuthenticationInputDTO {}

interface IGenerateRoomCodeOutputDTO {
  roomCode: string
}

export { IGenerateRoomCodeInputDTO, IGenerateRoomCodeOutputDTO }
