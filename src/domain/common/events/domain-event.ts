import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityId;
}
