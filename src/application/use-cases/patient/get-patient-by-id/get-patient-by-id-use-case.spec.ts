import { GetPatientByIdUseCase } from './get-patient-by-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryRepository: InMemoryPatientRepository;
let sut: GetPatientByIdUseCase;

describe('Get Patient By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    sut = new GetPatientByIdUseCase(inMemoryRepository);
  });

  it('should be able to get a patient by id', async () => {
    const newPatient = makePatient({}, new UniqueEntityId('id-1'));
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      patientId: 'id-1',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value?.patient.id).toEqual(newPatient.id);
    }
  });
});
