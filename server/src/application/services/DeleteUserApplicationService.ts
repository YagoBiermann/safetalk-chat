import UserError from '../../domain/errors/models/UserError'
import UserDeletedEvent from '../../domain/events/UserDeletedEvent'
import ArgumentAssertion from '../../domain/models/common/ArgumentAssertion'
import DomainEventPublisher from '../../domain/models/common/DomainEventPublisher'
import IDomainEventSubscriber from '../../domain/models/common/DomainEventSubscriber'
import IUserRepository from '../../domain/models/user/UserRepository'
import IApplicationService from '../ports/services/ApplicationService'
import { IAuthenticationService } from '../ports/services/AuthenticationService'
import { IDeleteUserInputDTO } from '../ports/services/DeleteUserApplicationService'
import IValidation from '../ports/validations/Validation'

class DeleteUserApplicationService
  extends ArgumentAssertion
  implements IApplicationService
{
  constructor(
    private userRepository: IUserRepository,
    private authenticationService: IAuthenticationService,
    private roomNotExistsValidation: IValidation,
    private deleteRoomIfEmptyWhenUserDeletedEventSubscriber: IDomainEventSubscriber<UserDeletedEvent>
  ) {
    super()
  }

  public async exec({
    accessKey,
    roomId,
    userId
  }: IDeleteUserInputDTO): Promise<null> {
    this.assertArgumentNotNull(userId, new UserError('ERR_USER_NOT_FOUND'))
    await this.authenticationService.authenticate({ userId, accessKey })
    DomainEventPublisher.instance().addSubscriber(
      this.deleteRoomIfEmptyWhenUserDeletedEventSubscriber
    )
    await this.userRepository.delete(userId)
    if (roomId) {
      await this.roomNotExistsValidation.validate({ roomId })
      DomainEventPublisher.instance().publish(
        new UserDeletedEvent(roomId, userId)
      )
    }
    DomainEventPublisher.instance().removeAllSubscribers()
    return null
  }
}

export default DeleteUserApplicationService
