import IDomainEventSubscriber from '../../../domain/models/common/DomainEventSubscriber'
import UserDeletedEvent from '../../../domain/events/UserDeletedEvent'
import { IRoomRepository } from '../../../domain/models/room/RoomRepository'
import ICloudService from '../../ports/services/CloudService'

class DeleteRoomIfEmptyWhenUserDeletedEventSubscriber
  implements IDomainEventSubscriber<UserDeletedEvent>
{
  constructor(
    private roomRepository: IRoomRepository,
    private cloudService: ICloudService
  ) {}
  eventName(): string {
    return UserDeletedEvent.name
  }
  subscribedToAllEvents(): boolean {
    return false
  }

  public async handleEvent(anEvent: UserDeletedEvent): Promise<void> {
    try {
      const user = anEvent.userId
      const room = await this.roomRepository.getRoomById(anEvent.roomId)
      const hasUsers = room.users.length > 1 // 1 represents the last user who left the room
      if (hasUsers) {
        room.disconnect(user)
        await this.roomRepository.save(room)
        return
      }
      await this.roomRepository.delete(room.id)
      await this.cloudService.deleteDirectory(room.roomCode)
    } catch (error) {
      throw error
    }
  }
}

export default DeleteRoomIfEmptyWhenUserDeletedEventSubscriber
