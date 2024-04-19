import { CreateClinicianUseCase } from './create-clinician-use-case';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';

let inMemoryRepository: InMemoryClinicianRepository;
let sut: CreateClinicianUseCase;

describe('Create Clinician', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    sut = new CreateClinicianUseCase(inMemoryRepository);
  });

  it('should be able to create a clinician', async () => {
    const result = await sut.execute({
      name: 'John',
      surname: 'Doe',
      occupation: 'Doctor',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.clinician.name).toBe('John');
      expect(result.value.clinician.surname).toBe('Doe');
      expect(result.value.clinician.occupation).toBe('Doctor');
    }
  });
});
