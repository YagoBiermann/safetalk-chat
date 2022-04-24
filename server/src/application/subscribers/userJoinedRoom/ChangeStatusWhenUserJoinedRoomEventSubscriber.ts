import IDomainEventSubscriber from '../../../domain/models/common/DomainEventSubscriber'
import ISingleTransaction from '../../../domain/models/common/SingleTransaction'
import UserJoinedRoomEvent from '../../../domain/events/UserJoinedRoomEvent'
import IUserRepository from '../../../domain/models/user/UserRepository'

class ChangeUserStatusWhenJoinedRoomEventSubscriber
  implements IDomainEventSubscriber<UserJoinedRoomEvent>
{
  constructor(
    private _userRepository: IUserRepository,
    private _singleTransaction: ISingleTransaction
  ) {}
  eventName(): string {
    return UserJoinedRoomEvent.name
  }
  subscribedToAllEvents(): boolean {
    return false
  }

  public async handleEvent(anEvent: UserJoinedRoomEvent): Promise<void> {
    const isEmpty = Object.values(anEvent).some(value => !value)
    if (isEmpty) throw new Error(`${anEvent} is not a valid event`)
    const room = anEvent.room
    const user = await this._userRepository.getUserById(anEvent.userId)
    user.connect(room.id)
    await this._singleTransaction.saveAll(user, room)
  }
}

export default ChangeUserStatusWhenJoinedRoomEventSubscriber
