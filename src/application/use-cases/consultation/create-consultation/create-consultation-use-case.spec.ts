import { makePatient } from 'test/factories/make-patient';
import { CreateConsultationUseCase } from './create-consultation-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

let inConsultationMemoryRepository: InMemoryConsultationRepository;
let inPatientMemoryRepository: InMemoryPatientRepository;
let sut: CreateConsultationUseCase;

describe('Schedule Consultation', () => {
  beforeEach(() => {
    inPatientMemoryRepository = new InMemoryPatientRepository();
    inConsultationMemoryRepository = new InMemoryConsultationRepository(
      inPatientMemoryRepository,
    );
    sut = new CreateConsultationUseCase(
      inConsultationMemoryRepository,
      inPatientMemoryRepository,
    );
  });

  it('should be able to schedule a consultation for a patient', async () => {
    const newPatient = makePatient({});
    inPatientMemoryRepository.items.push(newPatient);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = await sut.execute({
      clinicianId: '1',
      patientId: newPatient.id.toString(),
      room: 1,
      appointmentDate: tomorrow,
    });

    expect(result.isRight()).toBe(true);
    expect(inConsultationMemoryRepository.items.length).toEqual(1);
    if (result.isRight()) {
      expect(result.value.consultation.patientId).toEqual(newPatient.id);
      expect(
        inPatientMemoryRepository.items[0].medicalRecord.consultationsIds.currentItems,
      ).toHaveLength(1);
      expect(
        inPatientMemoryRepository.items[0].medicalRecord.consultationsIds.currentItems[0],
      ).toEqual(inConsultationMemoryRepository.items[0].id);
    }
  });

  it('should not be able to schedule a consultation without a patient', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = await sut.execute({
      clinicianId: '1',
      patientId: '1',
      room: 1,
      appointmentDate: tomorrow,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFound);
    expect(inConsultationMemoryRepository.items.length).toEqual(0);
  });
});
