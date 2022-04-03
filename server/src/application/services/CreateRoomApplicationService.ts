import RoomError from '../../domain/errors/models/RoomError'
import UserJoinedRoomEvent from '../../domain/events/UserJoinedRoomEvent'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import DomainEventPublisher from '../../domain/models/common/DomainEventPublisher'
import IDomainEventSubscriber from '../../domain/models/common/DomainEventSubscriber'
import Room from '../../domain/models/room/Room'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import ICloudService from '../ports/services/CloudService'
import {
  ICreateRoomInputDTO,
  ICreateRoomOutputDTO
} from '../ports/services/CreateRoomApplicationService'
import IValidation from '../ports/validations/Validation'

class CreateRoomApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(
    private authenticationService: IAuthenticationService,
    private cloudService: ICloudService,
    private roomAlreadyExistsValidation: IValidation,
    private userAlreadyInRoomValidation: IValidation,
    private changeStatusWhenUserJoinedRoomEventSubscriber: IDomainEventSubscriber<UserJoinedRoomEvent>
  ) {
    super()
  }

  public async exec({
    roomCode,
    auth: { accessKey, userId }
  }: ICreateRoomInputDTO): Promise<ICreateRoomOutputDTO> {
    this.assertArgumentNotNull(
      roomCode,
      new RoomError('ERR_ROOM_CODE_NOT_PROVIDED')
    )
    try {
      await this.authenticationService.authenticate({ accessKey, userId })
      await this.roomAlreadyExistsValidation.validate(roomCode)
      await this.userAlreadyInRoomValidation.validate(userId)
      DomainEventPublisher.instance().addSubscriber(
        this.changeStatusWhenUserJoinedRoomEventSubscriber
      )
      const room = new Room({ roomCode })
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

export default CreateRoomApplicationService
