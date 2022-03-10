import IDomainEventSubscriber from '../../common/DomainEventSubscriber'
import ISingleTransaction from '../../common/SingleTransaction'
import RoomCreatedEvent from '../../room/RoomCreatedEvent'
import IUserRepository from '../../user/UserRepository'

class OnRoomCreatedSubscriber implements IDomainEventSubscriber<RoomCreatedEvent> {
  constructor(
    private _userRepository: IUserRepository,
    private _singleTransaction: ISingleTransaction
  ) {}
  eventName(): string {
    return RoomCreatedEvent.name
  }
  subscribedToAllEvents(): boolean {
    return false
  }

  public async handleEvent(anEvent: RoomCreatedEvent): Promise<void> {
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

export default OnRoomCreatedSubscriber
