import { DeleteConsultationByIdUseCase } from './delete-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';

let inMemoryConsultationRepository: InMemoryConsultationRepository;
let inMemoryPatientRepository: InMemoryPatientRepository;
let sut: DeleteConsultationByIdUseCase;

describe('Delete a consultation By Id', () => {
  beforeEach(() => {
    inMemoryConsultationRepository = new InMemoryConsultationRepository();
    inMemoryPatientRepository = new InMemoryPatientRepository();
    sut = new DeleteConsultationByIdUseCase(
      inMemoryConsultationRepository,
      inMemoryPatientRepository,
    );
  });

  it('should be able to delete a consultation by id', async () => {
    const newPatient = makePatient();
    const newConsultation = makeConsultation({
      patientId: newPatient.id,
      clinicianId: new UniqueEntityId('clinicianId-1'),
    });
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryConsultationRepository.create(newConsultation);

    const result = await sut.execute({
      consultationId: newConsultation.id.toString(),
      patientId: newPatient.id.toString(),
      clinicianId: 'clinicianId-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryConsultationRepository.items).toHaveLength(0);
    if (result.isRight()) {
      expect(newPatient.medicalRecord.consultationsIds.getRemovedItems()).toEqual([
        newConsultation.id,
      ]);
    }
  });

  it('should not be able to delete a consultation from another user', async () => {
    const newPatient = makePatient();
    const newConsultation = makeConsultation({
      patientId: newPatient.id,
      clinicianId: new UniqueEntityId('clinicianId-1'),
    });
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryConsultationRepository.create(newConsultation);

    const result = await sut.execute({
      consultationId: newConsultation.id.toString(),
      patientId: newPatient.id.toString(),
      clinicianId: 'clinicianId-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowed);
  });
});
