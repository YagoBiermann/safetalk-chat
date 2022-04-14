/**
 * @jest-environment node
 */

import {
  describe,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
  afterEach,
  test,
  jest
} from '@jest/globals'
import DomainEventPublisher from '../../../../src/domain/models/common/DomainEventPublisher'
import IDomainEventSubscriber from '../../../../src/domain/models/common/DomainEventSubscriber'
import IDomainEvent from '../../../../src/domain/models/common/DomainEvent'

class MockedEvent implements IDomainEvent {
  public eventName(): string {
    return 'MockEvent'
  }
  public occurredOn(): Date {
    return new Date()
  }
}

class MockedSubscriber implements IDomainEventSubscriber<MockedEvent> {
  eventName(): string {
    return MockedEvent.name
  }
  handleEvent(
    anEvent: MockedEvent
  ): Promise<{ name: string; occurredOn: Date }> {
    return Promise.resolve({
      name: anEvent.eventName(),
      occurredOn: anEvent.occurredOn()
    })
  }
  subscribedToAllEvents(): boolean {
    return false
  }
}

describe('Domain event publisher', () => {
  beforeEach(() => {
    DomainEventPublisher.instance().resetInstance()
  })

  test('should be a singleton', () => {
    const publisher1 = DomainEventPublisher.instance()
    const publisher2 = DomainEventPublisher.instance()
    expect(publisher1).toBe(publisher2)
  })

  test('should add a subscriber', () => {
    const publisher = DomainEventPublisher.instance()
    publisher.addSubscriber(new MockedSubscriber())
    expect(DomainEventPublisher.instance().subscribers.length).toBe(1)
  })

  test('should remove a subscriber', () => {
    const publisher = DomainEventPublisher.instance()
    publisher.addSubscriber(new MockedSubscriber())
    expect(DomainEventPublisher.instance().subscribers.length).toBe(1)
    publisher.removeSubscriber(new MockedSubscriber())
    expect(DomainEventPublisher.instance().subscribers.length).toBe(0)
  })

  test('should remove all subscribers', () => {
    const publisher = DomainEventPublisher.instance()
    publisher.addSubscriber(new MockedSubscriber())
    publisher.addSubscriber(new MockedSubscriber())
    expect(DomainEventPublisher.instance().subscribers.length).toBe(2)
    publisher.removeAllSubscribers()
    expect(DomainEventPublisher.instance().subscribers.length).toBe(0)
  })

  test('should publish an event', () => {
    const publisherSpy = jest.spyOn(DomainEventPublisher.instance(), 'publish')
    const publisher = DomainEventPublisher.instance()
    const subscriber = new MockedSubscriber()
    publisher.addSubscriber(subscriber)
    const event = new MockedEvent()
    const result = publisher.publish(event)
    expect(result).toBe(undefined)
    expect(publisherSpy).toHaveBeenCalledWith(event)
  })
})
