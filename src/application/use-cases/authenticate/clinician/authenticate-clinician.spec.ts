import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { AuthenticateClinicianUseCase } from './authenticate-clinician';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makeClinician } from 'test/factories/make-clinician';
import { WrongCredentials } from '@/application/common/error-handler/errors/wrong-credentials';

let inMemoryRepository: InMemoryClinicianRepository;
let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let sut: AuthenticateClinicianUseCase;

describe('Authenticate Clinician', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    fakeEncrypter = new FakeEncrypter();
    fakeHasher = new FakeHasher();
    sut = new AuthenticateClinicianUseCase(inMemoryRepository, fakeHasher, fakeEncrypter);
  });

  it('should be able to authenticate a clinician', async () => {
    const clinician = makeClinician({
      email: 'johndoe@email.com',
      password: await fakeHasher.hash('123456'),
    });
    inMemoryRepository.items.push(clinician);

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it('should not be able to authenticate a clinician with incorrect credentials', async () => {
    const clinician = makeClinician({});
    inMemoryRepository.items.push(clinician);

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentials);
  });
});
