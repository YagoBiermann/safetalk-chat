import IDomainEvent from '../models/common/DomainEvent'
import Room from '../models/room/Room'

class UserJoinedRoomEvent implements IDomainEvent {
  private _eventName: string = UserJoinedRoomEvent.name
  constructor(
    private readonly _room: Room,
    private readonly _userId: string,
    private readonly _createdAt: Date = new Date()
  ) {}
  public occurredOn(): Date {
    return this._createdAt
  }

  get room(): Room {
    return this._room
  }

  get userId(): string {
    return this._userId
  }

  eventName(): string {
    return this._eventName
  }
}

export default UserJoinedRoomEvent
