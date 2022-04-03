import { Signer } from 'aws-sdk/clients/cloudfront'
import { IAuthenticationInputDTO } from './AuthenticationService'

interface IJoinRoomInputDTO {
  roomCode: string
  auth: IAuthenticationInputDTO
}

interface IJoinRoomOutputDTO {
  roomId: string
  newAccessKey: string
  cloudAccessKeys: Signer.CustomPolicy
}

export { IJoinRoomInputDTO, IJoinRoomOutputDTO }
