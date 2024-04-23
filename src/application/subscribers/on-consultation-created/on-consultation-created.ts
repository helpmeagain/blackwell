import { DomainEvents } from '@/domain/common/events/domain-events';
import { EventHandler } from '@/domain/common/events/event-handler';
import { ConsultationCreatedEvent } from '@/domain/events/consultation-created-event';

export class OnConsultationCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewNotification.bind(this),
      ConsultationCreatedEvent.name,
    );
  }

  private async sendNewNotification({ consultation }: ConsultationCreatedEvent) {
    console.log(consultation);
  }
}
