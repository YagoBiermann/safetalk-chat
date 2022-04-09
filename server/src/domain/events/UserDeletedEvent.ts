import IDomainEvent from '../models/common/DomainEvent'

class UserDeletedEvent implements IDomainEvent {
  private _eventName: string = UserDeletedEvent.name
  constructor(
    private readonly _roomId: string,
    private readonly _userId: string,
    private readonly _createdAt: Date = new Date()
  ) {}
  public occurredOn(): Date {
    return this._createdAt
  }

  get roomId(): string {
    return this._roomId
  }

  get userId(): string {
    return this._userId
  }

  eventName(): string {
    return this._eventName
  }
}

export default UserDeletedEvent
