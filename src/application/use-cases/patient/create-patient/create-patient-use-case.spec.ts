import { CreatePatientUseCase } from './create-patient-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';

let inMemoryRepository: InMemoryPatientRepository;
let sut: CreatePatientUseCase;

describe('Create Patient', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    sut = new CreatePatientUseCase(inMemoryRepository);
  });

  it('should be able to create a patient', async () => {
    const result = await sut.execute({
      name: 'John',
      surname: 'Doe',
      birthDate: new Date(),
      phoneNumber: '+1234567890',
      email: 'jonhdoe@email.com',
    });

    expect(result.isRight()).toBe(true);
  });
});
