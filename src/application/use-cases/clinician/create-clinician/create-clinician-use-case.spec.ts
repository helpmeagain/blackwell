import { FakeHasher } from 'test/cryptography/fake-hasher';
import { CreateClinicianUseCase } from './create-clinician-use-case';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';

let inMemoryRepository: InMemoryClinicianRepository;
let fakeHasher: FakeHasher;
let sut: CreateClinicianUseCase;

describe('Create Clinician', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    fakeHasher = new FakeHasher();
    sut = new CreateClinicianUseCase(inMemoryRepository, fakeHasher);
  });

  it('should be able to create a clinician', async () => {
    const result = await sut.execute({
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      phoneNumber: '123456789',
      email: 'johndoe@email.com',
      password: '123456',
      occupation: 'Doctor',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items).toHaveLength(1);
    expect(result.value).toEqual({
      clinician: inMemoryRepository.items[0],
    });
  });

  it('should be able to hash a password', async () => {
    const result = await sut.execute({
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      phoneNumber: '123456789',
      email: 'johndoe@email.com',
      password: '123456',
      occupation: 'Doctor',
    });

    const hashedPassword = await fakeHasher.hash('123456');

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items[0].password).toEqual(hashedPassword);
  });
});
