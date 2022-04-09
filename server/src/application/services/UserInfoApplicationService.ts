import UserError from '../../domain/errors/models/UserError'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import { IRoomRepository } from '../../domain/models/room/RoomRepository'
import IUserRepository from '../../domain/models/user/UserRepository'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import {
  IUserInfoInputDTO,
  IUserInfoOutputDTO
} from '../ports/services/UserInfoApplicationService'
import IValidation from '../ports/validations/Validation'

class UserInfoApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(
    private userRepository: IUserRepository,
    private roomRepository: IRoomRepository,
    private authenticationService: IAuthenticationService,
    private userNotExistsValidation: IValidation
  ) {
    super()
  }

  public async exec({
    userId,
    accessKey
  }: IUserInfoInputDTO): Promise<IUserInfoOutputDTO> {
    this.assertArgumentNotNull(userId, new UserError('ERR_USER_NOT_FOUND'))
    await this.authenticationService.authenticate({ userId, accessKey })
    await this.userNotExistsValidation.validate(userId)
    const user = await this.userRepository.getUserById(userId)
    const room = await this.roomRepository.getRoomById(user.room)

    const userInfo = {
      userId: user.id,
      username: user.username,
      isOnline: user.isOnline,
      room: room ? room.id : null,
      roomCode: room ? room.roomCode : null,
      messages: room ? room.messages : []
    }
    return userInfo
  }
}

export default UserInfoApplicationService
