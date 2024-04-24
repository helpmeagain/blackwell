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
      gender: 'male',
      phoneNumber: '123456789',
      email: 'johndoe@email.com',
      occupation: 'Doctor',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.clinician.name).toBe('John');
      expect(inMemoryRepository.items).toHaveLength(1);
      expect(inMemoryRepository.items[0]).toEqual(result.value.clinician);
    }
  });
});
