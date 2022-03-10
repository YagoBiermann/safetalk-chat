interface IDomainEvent {
  eventName(): string
  occurredOn(): Date
}

export default IDomainEvent
