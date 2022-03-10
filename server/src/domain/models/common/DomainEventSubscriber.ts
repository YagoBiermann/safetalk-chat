interface IDomainEventSubscriber<EventType> {
  eventName(): string
  subscribedToAllEvents?(): boolean
  handleEvent(anEvent: EventType): Promise<any>
}

export default IDomainEventSubscriber
