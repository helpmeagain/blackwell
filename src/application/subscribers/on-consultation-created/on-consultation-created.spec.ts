import { makeConsultation } from 'test/factories/make-consultation';
import { OnConsultationCreated } from './on-consultation-created';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { CreateNotificationUseCase } from '@/application/use-cases/notification/create-notification/create-notification-use-case';
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository';
import { MockInstance } from 'vitest';
import { waitFor } from 'test/utils/wait-for';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let inMemoryConsultationRepository: InMemoryConsultationRepository;
let inMemoryNotificationRepository: InMemoryNotificationRepository;
let createNotification: CreateNotificationUseCase;
let createNotificationSpy: MockInstance<typeof createNotification.execute>;

describe('On consultation created', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    inMemoryConsultationRepository = new InMemoryConsultationRepository(
      inMemoryUniversalMedicalRecordRepository,
    );
    createNotification = new CreateNotificationUseCase(inMemoryNotificationRepository);

    createNotificationSpy = vi.spyOn(createNotification, 'execute');
    new OnConsultationCreated(inMemoryPatientRepository, createNotification);
  });

  it('should send a new notification when a consultation is created', async () => {
    const patient = makePatient();
    const consultation = makeConsultation({ patientId: patient.id });
    inMemoryPatientRepository.create(patient);
    inMemoryConsultationRepository.create(consultation);
    await waitFor(() => {
      expect(createNotificationSpy).toHaveBeenCalled();
    });
  });
});
