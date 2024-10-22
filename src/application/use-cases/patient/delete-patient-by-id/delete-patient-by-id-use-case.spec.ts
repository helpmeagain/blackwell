import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { DeletePatientByIdUseCase } from './delete-patient-by-id-use-case';
import { makePatient } from 'test/factories/make-patient';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryRepository: InMemoryPatientRepository;
let sut: DeletePatientByIdUseCase;

describe('Delete a patient By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    sut = new DeletePatientByIdUseCase(inMemoryRepository);
  });

  it('should be able to delete a patient by id', async () => {
    const newPatient = makePatient({}, new UniqueEntityId('patientId-1'));
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      patientId: 'patientId-1',
      currentUserId: 'patientId-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items).toHaveLength(0);
  });
});
