import { AggregateRoot } from '@domain/common/aggregate-root';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: CustomAggregate; // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create(): CustomAggregate {
    const aggregate = new CustomAggregate(null);
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));
    return aggregate;
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callBackSpy = vi.fn();

    // Subscriber registered (listening to event of "created something")
    DomainEvents.register(callBackSpy, CustomAggregateCreated.name);

    // Creating something, but without saving on the database
    const aggregate = CustomAggregate.create();

    // Asserting that the event was added, but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1);
    expect(callBackSpy).not.toHaveBeenCalled();

    // Saving the event on the database and dispatching it
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // Asserting that the event was listened and dispatched
    expect(callBackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
