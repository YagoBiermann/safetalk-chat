import RoomError from '../../domain/errors/models/RoomError'
import UserJoinedRoomEvent from '../../domain/events/UserJoinedRoomEvent'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import DomainEventPublisher from '../../domain/models/common/DomainEventPublisher'
import IDomainEventSubscriber from '../../domain/models/common/DomainEventSubscriber'
import { IRoomRepository } from '../../domain/models/room/RoomRepository'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import ICloudService from '../ports/services/CloudService'
import {
  IJoinRoomInputDTO,
  IJoinRoomOutputDTO
} from '../ports/services/JoinRoomApplicationService'
import IValidation from '../ports/validations/Validation'
import { IRoomNotExistsValidationInput } from '../validations/RoomNotExistsValidation'

class JoinRoomApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(
    private roomRepository: IRoomRepository,
    private authenticationService: IAuthenticationService,
    private cloudService: ICloudService,
    private roomNotExistsValidation: IValidation<IRoomNotExistsValidationInput>,
    private userAlreadyInRoomValidation: IValidation,
    private changeStatusWhenUserJoinedRoomEventSubscriber: IDomainEventSubscriber<UserJoinedRoomEvent>
  ) {
    super()
  }

  public async exec({
    roomCode,
    auth: { accessKey, userId }
  }: IJoinRoomInputDTO): Promise<IJoinRoomOutputDTO> {
    this.assertArgumentNotNull(
      roomCode,
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
    try {
      await this.authenticationService.authenticate({ accessKey, userId })
      await this.roomNotExistsValidation.validate({ roomCode })
      await this.userAlreadyInRoomValidation.validate(userId)
      DomainEventPublisher.instance().addSubscriber(
        this.changeStatusWhenUserJoinedRoomEventSubscriber
      )
      const room = await this.roomRepository.getRoomByCode(roomCode)
      room.connect(userId)
      DomainEventPublisher.instance().publish(
        new UserJoinedRoomEvent(room, userId)
      )
      DomainEventPublisher.instance().removeAllSubscribers()
      const newAccessKey = this.authenticationService.generateAccessKey(
        userId,
        process.env.JWT_ROOM_SECRET,
        '3d' // 3 days
      )
      const cloudAccessKeys = this.cloudService.getSignedCookie(roomCode)
      return { roomId: room.id, newAccessKey, cloudAccessKeys }
    } catch (error) {
      throw error
    }
  }
}

export default JoinRoomApplicationService
