import { PatientRepository } from '@/application/repositories/patient-repository';
import { OnConsultationCreated } from '@/application/subscribers/on-consultation-created/on-consultation-created';
import { Injectable } from '@nestjs/common';
import { NestCreateNotificationUseCase } from './nest-create-notification-use-case';

@Injectable()
export class NestOnConsultationCreated extends OnConsultationCreated {
  constructor(
    patientRepository: PatientRepository,
    createNotification: NestCreateNotificationUseCase,
  ) {
    super(patientRepository, createNotification);
  }
}
