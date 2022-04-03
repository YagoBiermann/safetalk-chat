import { IFileMetaData } from '../../../domain/models/room/message/MessageDTO'
import MESSAGE_TYPE from '../../../domain/models/room/message/MessageType'
import { IAuthenticationInputDTO } from './AuthenticationService'

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

export { ISaveMessageInputDTO, ISaveMessageOutputDTO }
