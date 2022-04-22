import IDomainEventSubscriber from '../../../domain/models/common/DomainEventSubscriber'
import UserDeletedEvent from '../../../domain/events/UserDeletedEvent'
import { IRoomRepository } from '../../../domain/models/room/RoomRepository'
import ICloudService from '../../ports/services/CloudService'
import RoomError from '../../../domain/errors/models/RoomError'

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
    const isEmpty = Object.values(anEvent).some(value => !value)
    if (isEmpty) throw new Error(`${anEvent} is not a valid event`)
    const user = anEvent.userId
    const room = await this.roomRepository.getRoomById(anEvent.roomId)
    if (!room) throw new RoomError('ERR_ROOM_NOT_FOUND')
    const hasUsers = room.users.length > 1 // 1 represents the last user who left the room
    if (hasUsers) {
      room.disconnect(user)
      await this.roomRepository.save(room)
      return
    }
    await this.roomRepository.delete(room.id)
    await this.cloudService.deleteDirectory(room.roomCode)
  }
}

export default DeleteRoomIfEmptyWhenUserDeletedEventSubscriber
