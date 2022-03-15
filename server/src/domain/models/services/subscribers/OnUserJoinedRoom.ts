import IDomainEventSubscriber from '../../common/DomainEventSubscriber'
import ISingleTransaction from '../../common/SingleTransaction'
import UserJoinedRoomEvent from '../../../events/UserJoinedRoomEvent'
import IUserRepository from '../../user/UserRepository'

class OnUserJoinedRoomSubscriber
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
    try {
      const room = anEvent.room
      const user = await this._userRepository.getUserById(anEvent.userId)
      user.joinRoom(room.id)
      user.connect()
      await this._singleTransaction.saveAll(user, room)
    } catch (error) {
      throw error
    }
  }
}

export default OnUserJoinedRoomSubscriber
