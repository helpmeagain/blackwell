import { DeleteClinicalConsultationByIdUseCase } from './delete-clinical-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: DeleteClinicalConsultationByIdUseCase;

describe('Delete a clinical consultation By Id', () => {
  beforeEach(() => {
    inMemoryConsultationRepository = new InMemoryConsultationRepository();
    sut = new DeleteClinicalConsultationByIdUseCase(inMemoryConsultationRepository);
  });

  it('should be able to delete a clinical consultation by id', async () => {
    const newClinicalConsultation = makeConsultation(
      { clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryConsultationRepository.create(newClinicalConsultation);

    await sut.execute({
      clinicalConsultationId: 'consultationId-1',
      clinicianId: 'clinicianId-1',
    });

    expect(inMemoryConsultationRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a clinical consultation from another user', async () => {
    const newClinicalConsultation = makeConsultation(
      { clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryConsultationRepository.create(newClinicalConsultation);

    expect(() => {
      return sut.execute({
        clinicalConsultationId: 'consultationId-1',
        clinicianId: 'clinicianId-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
