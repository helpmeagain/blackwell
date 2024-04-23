import { DomainEvent } from '../common/events/domain-event';
import { Consultation } from '../entities/consultation';
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';

export class ConsultationCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public consultation: Consultation;

  constructor(consultation: Consultation) {
    this.consultation = consultation;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.consultation.id;
  }
}
