import { PatientRepository } from '@/application/repositories/patient-repository';
import { CreateNotificationUseCase } from '@/application/use-cases/notification/create-notification/create-notification-use-case';
import { DomainEvents } from '@/domain/common/events/domain-events';
import { EventHandler } from '@/domain/common/events/event-handler';
import { ConsultationCreatedEvent } from '@/domain/events/consultation-created-event';

export class OnConsultationCreated implements EventHandler {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly createNotification: CreateNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewNotification.bind(this),
      ConsultationCreatedEvent.name,
    );
  }

  private async sendNewNotification({ consultation }: ConsultationCreatedEvent) {
    const patient = await this.patientRepository.findById(
      consultation.patientId.toString(),
    );

    if (patient) {
      await this.createNotification.execute({
        recipientId: patient.id.toString(),
        title: `New consultation has been created!`,
        message: `The consultation is scheduled for ${consultation.appointmentDate.toLocaleString()}.`,
      });
    }
  }
}
