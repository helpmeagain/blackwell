import { GetClinicianByIdUseCase } from './get-clinician-by-id-use-case';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { makeClinician } from 'test/factories/make-clinician';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryRepository: InMemoryClinicianRepository;
let sut: GetClinicianByIdUseCase;

describe('Get Clinician By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    sut = new GetClinicianByIdUseCase(inMemoryRepository);
  });

  it('should be able to get a clinician by id', async () => {
    const newClinician = makeClinician({}, new UniqueEntityId('id-1'));
    await inMemoryRepository.create(newClinician);

    const result = await sut.execute({
      clinicianId: 'id-1',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value?.clinician.id).toEqual(newClinician.id);
    }
  });
});
