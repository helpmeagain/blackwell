import { DeleteConsultationByIdUseCase } from './delete-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryRepository: InMemoryConsultationRepository;
let sut: DeleteConsultationByIdUseCase;

describe('Delete a consultation By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryConsultationRepository();
    sut = new DeleteConsultationByIdUseCase(inMemoryRepository);
  });

  it('should be able to delete a consultation by id', async () => {
    const newConsultation = makeConsultation(
      { clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryRepository.create(newConsultation);

    await sut.execute({
      consultationId: 'consultationId-1',
      clinicianId: 'clinicianId-1',
    });

    expect(inMemoryRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a consultation from another user', async () => {
    const newConsultation = makeConsultation(
      { clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryRepository.create(newConsultation);

    expect(() => {
      return sut.execute({
        consultationId: 'consultationId-1',
        clinicianId: 'clinicianId-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
