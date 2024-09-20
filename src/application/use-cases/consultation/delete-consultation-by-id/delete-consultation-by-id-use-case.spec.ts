import { DeleteConsultationByIdUseCase } from './delete-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';

let inMemoryConsultationRepository: InMemoryConsultationRepository;
let inMemoryPatientRepository: InMemoryPatientRepository;
let sut: DeleteConsultationByIdUseCase;

describe('Delete a consultation By Id', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryConsultationRepository = new InMemoryConsultationRepository(
      inMemoryPatientRepository,
    );
    sut = new DeleteConsultationByIdUseCase(
      inMemoryConsultationRepository,
      inMemoryPatientRepository,
    );
  });

  it('should be able to delete a consultation by id', async () => {
    const newPatient = makePatient({}, new UniqueEntityId('patientId-1'));
    const newConsultation = makeConsultation(
      {
        patientId: newPatient.id,
        clinicianId: new UniqueEntityId('clinicianId-1'),
      },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryConsultationRepository.create(newConsultation);

    const result = await sut.execute({
      consultationId: newConsultation.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryConsultationRepository.items).toHaveLength(0);
    expect(
      inMemoryPatientRepository.items[0].universalMedicalRecord.consultationsIds.currentItems,
    ).toHaveLength(0);
    expect(
      inMemoryPatientRepository.items[0].universalMedicalRecord.consultationsIds.getRemovedItems()[0],
    ).toBe(newConsultation.id);
  });
});
