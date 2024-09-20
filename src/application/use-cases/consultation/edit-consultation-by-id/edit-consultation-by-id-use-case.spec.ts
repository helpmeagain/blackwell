import { EditConsultationByIdUseCase } from './edit-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { makePatient } from 'test/factories/make-patient';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';

let inConsultationMemoryRepository: InMemoryConsultationRepository;
let inPatientMemoryRepository: InMemoryPatientRepository;
let sut: EditConsultationByIdUseCase;

describe('Edit a consultation By Id', () => {
  beforeEach(() => {
    inPatientMemoryRepository = new InMemoryPatientRepository();
    inConsultationMemoryRepository = new InMemoryConsultationRepository(
      inPatientMemoryRepository,
    );
    sut = new EditConsultationByIdUseCase(
      inConsultationMemoryRepository,
      inPatientMemoryRepository,
    );
  });

  it('should be able to edit a consultation by id', async () => {
    const newPatient = makePatient();
    const newConsultation = makeConsultation(
      { patientId: newPatient.id, clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inConsultationMemoryRepository.create(newConsultation);
    await inPatientMemoryRepository.create(newPatient);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = await sut.execute({
      consultationId: newConsultation.id.toString(),
      appointmentDate: tomorrow,
      room: 1,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(inConsultationMemoryRepository.items[0].appointmentDate).toEqual(
        result.value?.consultation.appointmentDate,
      );
      expect(inConsultationMemoryRepository.items[0].room).toEqual(
        result.value?.consultation.room,
      );
      expect(
        inPatientMemoryRepository.items[0].universalMedicalRecord.consultationsIds.currentItems,
      ).toContainEqual(newConsultation.id);
    }
  });
});
