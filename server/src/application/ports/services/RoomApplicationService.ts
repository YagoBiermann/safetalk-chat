import { Signer } from 'aws-sdk/clients/cloudfront'
import { IFileMetaData } from '../../../domain/models/room/message/MessageDTO'
import MESSAGE_TYPE from '../../../domain/models/room/message/MessageType'
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

interface IJoinRoomInputDTO {
  roomCode: string
  auth: IAuthenticationInputDTO
}

interface IJoinRoomOutputDTO {
  roomId: string
  newAccessKey: string
  cloudAccessKeys: Signer.CustomPolicy
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
    roomId: string
    roomCode: string
    isOnline: boolean
  }> {}

interface ISaveMessageInputDTO {
  auth: IAuthenticationInputDTO
  message: {
    roomCode: string
    message: string
    messageType: MESSAGE_TYPE
    createdAt: number
    file?: IFileMetaData
  }
}

interface ISaveMessageOutputDTO {
  messageId: string
  username: string
  roomCode: string
  messageType: MESSAGE_TYPE
  file: IFileMetaData
  message: string
  createdAt: number
}

interface IRoomApplicationService {
  createRoom(data: ICreateRoomInputDTO): Promise<ICreateRoomOutputDTO>
  joinRoom(data: IJoinRoomInputDTO): Promise<IJoinRoomOutputDTO>
  generateRoomCode(
    auth: IAuthenticationInputDTO
  ): Promise<IGenerateRoomCodeOutputDTO>
  getAllUsersFromRoom(
    data: IGetAllUsersFromRoomInputDTO
  ): Promise<IGetAllUsersFromRoomOutputDTO>
  saveMessage(data: ISaveMessageInputDTO): Promise<ISaveMessageOutputDTO>
}

export {
  IRoomApplicationService,
  ICreateRoomInputDTO,
  IJoinRoomInputDTO,
  IGenerateRoomCodeOutputDTO,
  IGetAllUsersFromRoomInputDTO,
  IGetAllUsersFromRoomOutputDTO,
  ICreateRoomOutputDTO,
  IJoinRoomOutputDTO,
  ISaveMessageInputDTO,
  ISaveMessageOutputDTO
}
