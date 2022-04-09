import { Signer } from 'aws-sdk/clients/cloudfront'
import { IAuthenticationInputDTO } from './AuthenticationService'

interface ICreateRoomInputDTO {
  roomCode: string
  auth: IAuthenticationInputDTO
}

interface ICreateRoomOutputDTO {
  roomId: string
  newAccessKey: string
  cloudAccessKeys: Signer.CustomPolicy
}

export { ICreateRoomInputDTO, ICreateRoomOutputDTO }
