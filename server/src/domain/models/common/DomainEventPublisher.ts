import IDomainEvent from './DomainEvent'
import IDomainEventSubscriber from './DomainEventSubscriber'

class DomainEventPublisher {
  private static _instance: DomainEventPublisher
  private _subscribers: IDomainEventSubscriber<any>[] = []
  private constructor() {}

  public static instance(): DomainEventPublisher {
    if (!DomainEventPublisher._instance) {
      DomainEventPublisher._instance = new DomainEventPublisher()
    }
    return this._instance
  }

  public addSubscriber(subscriber: IDomainEventSubscriber<any>): void {
    const alreadyAdded = this._subscribers.includes(subscriber)
    if (alreadyAdded) {
      console.log(`${subscriber.constructor.name} is already added`)
    }
    this._subscribers.push(subscriber)
  }

  public removeSubscriber(subscriber: IDomainEventSubscriber<any>): void {
    const index = this._subscribers.indexOf(subscriber)
    if (index === -1) {
      console.log(`${subscriber.constructor.name} is not added`)
    }
    this._subscribers.splice(index, 1)
  }

  public removeAllSubscribers(): void {
    this._subscribers = []
  }

  public publish(anEvent: IDomainEvent): void {
    this._subscribers.forEach(subscriber => {
      const subscribedTo = subscriber.eventName()
      subscriber.subscribedToAllEvents()
        ? subscriber.handleEvent(anEvent)
        : null

      if (subscribedTo === anEvent.eventName()) {
        subscriber.handleEvent(anEvent)
      }
    })
  }
}

export default DomainEventPublisher
