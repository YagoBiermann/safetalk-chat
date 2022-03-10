import IDomainEvent from '../common/DomainEvent'
import Room from './Room'

class RoomCreatedEvent implements IDomainEvent {
  private _eventName: string = RoomCreatedEvent.name
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

export default RoomCreatedEvent
