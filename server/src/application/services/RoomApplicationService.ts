import RoomError from '../../domain/errors/models/RoomError'
import {
  IAuthenticationInputDTO,
  IAuthenticationService
} from '../../domain/models/auth/AuthenticationService'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import DomainEventPublisher from '../../domain/models/common/DomainEventPublisher'
import IDomainEventSubscriber from '../../domain/models/common/DomainEventSubscriber'
import Room from '../../domain/models/room/Room'
import UserJoinedRoomEvent from '../../domain/models/room/UserJoinedRoomEvent'
import {
  IRoomApplicationService,
  ICreateRoomInputDTO,
  IGenerateRoomCodeOutputDTO
} from '../ports/services/RoomApplicationService'
import IValidation from '../ports/validations/Validation'

class RoomApplicationService
  extends ArgumentAssertion
  implements IRoomApplicationService
{
  constructor(
    private authenticationService: IAuthenticationService,
    private roomAlreadyExistsValidation: IValidation,
    private onUserJoinedRoomSubscriber: IDomainEventSubscriber<UserJoinedRoomEvent>
  ) {
    super()
  }

  async createRoom({
    roomCode,
    auth: { accessKey, userId }
  }: ICreateRoomInputDTO): Promise<void> {
    this.assertArgumentNotNull(
      roomCode,
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
    try {
      await this.authenticate({ accessKey, userId })
      await this.roomAlreadyExistsValidation.validate(roomCode)
      DomainEventPublisher.instance().removeAllSubscribers()
      DomainEventPublisher.instance().addSubscriber(this.onUserJoinedRoomSubscriber)
      const room = new Room({ roomCode })
      room.join(userId)
    } catch (error) {
      throw error
    }
  }

  public async generateRoomCode({
    accessKey,
    userId
  }: IAuthenticationInputDTO): Promise<IGenerateRoomCodeOutputDTO> {
    await this.authenticate({ userId, accessKey })
    const roomCode = Room.generateRoomCode().value

    return { roomCode }
  }

  private authenticate({ accessKey, userId }: IAuthenticationInputDTO) {
    return this.authenticationService.authenticate({ userId, accessKey })
  }
}

export default RoomApplicationService
