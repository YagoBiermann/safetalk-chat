import IDomainEventSubscriber from '../../../domain/models/common/DomainEventSubscriber'
import UserDeletedEvent from '../../../domain/events/UserDeletedEvent'
import { IRoomRepository } from '../../../domain/models/room/RoomRepository'

class DeleteRoomIfEmptyWhenUserDeletedEventSubscriber
  implements IDomainEventSubscriber<UserDeletedEvent>
{
  constructor(private _roomRepository: IRoomRepository) {}
  eventName(): string {
    return UserDeletedEvent.name
  }
  subscribedToAllEvents(): boolean {
    return false
  }

  public async handleEvent(anEvent: UserDeletedEvent): Promise<void> {
    try {
      const user = anEvent.userId
      const room = await this._roomRepository.getRoomById(anEvent.roomId)
      const hasUsers = room.users.length > 1 // 1 represents the last user who left the room
      if (hasUsers) {
        room.disconnect(user)
        await this._roomRepository.save(room)
        return
      }
      await this._roomRepository.delete(room.id)
    } catch (error) {
      throw error
    }
  }
}

export default DeleteRoomIfEmptyWhenUserDeletedEventSubscriber
