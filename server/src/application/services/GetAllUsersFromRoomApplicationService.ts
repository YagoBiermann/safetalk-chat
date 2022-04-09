import AuthError from '../../domain/errors/models/AuthError'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import { IRoomRepository } from '../../domain/models/room/RoomRepository'
import GetUsersFromRoomDomainService from '../../domain/models/services/GetUsersFromRoom'
import IUserRepository from '../../domain/models/user/UserRepository'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import ICloudService from '../ports/services/CloudService'
import {
  IGetAllUsersFromRoomInputDTO,
  IGetAllUsersFromRoomOutputDTO
} from '../ports/services/GetAllUsersFromRoomApplicationService'
import IValidation from '../ports/validations/Validation'
import { IRoomNotExistsValidationInput } from '../validations/RoomNotExistsValidation'

class GetAllUsersFromRoomApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(
    private authenticationService: IAuthenticationService,
    private roomNotExistsValidation: IValidation<IRoomNotExistsValidationInput>,
    private roomRepository: IRoomRepository,
    private usersFromRoom: GetUsersFromRoomDomainService
  ) {
    super()
  }

  public async exec({
    roomId,
    auth: { accessKey, userId }
  }: IGetAllUsersFromRoomInputDTO): Promise<IGetAllUsersFromRoomOutputDTO> {
    this.assertArgumentNotNull(roomId, new AuthError('ERR_NOT_AUTHORIZED'))
    await this.authenticationService.authenticate({ accessKey, userId })
    await this.roomNotExistsValidation.validate({ roomId })
    const users = await this.usersFromRoom.exec(roomId)
    const room = await this.roomRepository.getRoomById(roomId)
    const allUsersFromRoom = users.map(user => ({
      userId: user.id,
      username: user.username,
      roomId: room.id,
      roomCode: room.roomCode,
      isOnline: user.isOnline
    }))

    return allUsersFromRoom
  }
}

export default GetAllUsersFromRoomApplicationService
