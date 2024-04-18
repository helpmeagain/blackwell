import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { DeleteClinicianByIdUseCase } from './delete-clinician-by-id-use-case';
import { makeClinician } from 'test/factories/make-clinician';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryRepository: InMemoryClinicianRepository;
let sut: DeleteClinicianByIdUseCase;

describe('Delete a clinician By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    sut = new DeleteClinicianByIdUseCase(inMemoryRepository);
  });

  it('should be able to delete a clinician by id', async () => {
    const newClinician = makeClinician({}, new UniqueEntityId('clinicianId-1'));
    await inMemoryRepository.create(newClinician);

    const result = await sut.execute({
      clinicianId: 'clinicianId-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items).toHaveLength(0);
  });
});
