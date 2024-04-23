import { DomainEvent } from './events/domain-event';
import { DomainEvents } from './events/domain-events';
import { BaseEntity } from './base-entity';

export abstract class AggregateRoot<Props> extends BaseEntity<Props> {
  private _domainEvents: DomainEvent[] = [];

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }
}
