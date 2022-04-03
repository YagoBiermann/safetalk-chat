import MessageError from '../../domain/errors/models/MessageError'
import RoomError from '../../domain/errors/models/RoomError'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import { IRoomRepository } from '../../domain/models/room/RoomRepository'
import IUserRepository from '../../domain/models/user/UserRepository'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import {
  ISaveMessageInputDTO,
  ISaveMessageOutputDTO
} from '../ports/services/SaveMessageApplicationService'

class SaveMessageApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(
    private userRepository: IUserRepository,
    private roomRepository: IRoomRepository,
    private authenticationService: IAuthenticationService
  ) {
    super()
  }

  public async exec({
    auth: { accessKey, userId },
    message: { roomCode, message, messageType, file, createdAt }
  }: ISaveMessageInputDTO): Promise<ISaveMessageOutputDTO> {
    this.assertArgumentNotNull(
      roomCode,
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
    this.assertArgumentNotNull(
      messageType,
      new MessageError('ERR_MESSAGE_EMPTY')
    )
    await this.authenticationService.authenticate({ userId, accessKey })
    const user = await this.userRepository.getUserById(userId)
    const room = await this.roomRepository.getRoomByCode(roomCode)
    room.addMessage({
      username: user.username,
      roomCode,
      message,
      messageType,
      file,
      createdAt
    })

    await this.roomRepository.save(room)
    const savedMessage = room.lastMessage()
    return {
      messageId: savedMessage.id,
      username: savedMessage.username,
      roomCode: savedMessage.roomCode,
      messageType: savedMessage.type,
      file: savedMessage.file,
      message: savedMessage.content,
      createdAt: savedMessage.creationTime
    }
  }
}

export default SaveMessageApplicationService
