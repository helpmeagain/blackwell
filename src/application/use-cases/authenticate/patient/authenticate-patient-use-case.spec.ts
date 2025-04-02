import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { AuthenticatePatientUseCase } from './authenticate-patient-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { makePatient } from 'test/factories/make-patient';
import { WrongCredentials } from '@/application/common/error-handler/errors/wrong-credentials';

let inMemoryRepository: InMemoryPatientRepository;
let fakeEncrypter: FakeEncrypter;
let fakeHasher: FakeHasher;
let sut: AuthenticatePatientUseCase;

describe('Authenticate Patient', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    fakeEncrypter = new FakeEncrypter();
    fakeHasher = new FakeHasher();
    sut = new AuthenticatePatientUseCase(inMemoryRepository, fakeHasher, fakeEncrypter);
  });

  it('should be able to authenticate a patient', async () => {
    const patient = makePatient({
      email: 'johndoe@email.com',
      password: await fakeHasher.hash('123456'),
    });
    inMemoryRepository.items.push(patient);

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
      role: "PATIENT",
      userId: patient.id.toString(),
    });
  });

  it('should not be able to authenticate a patient with incorrect credentials', async () => {
    const patient = makePatient({});
    inMemoryRepository.items.push(patient);

    const result = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentials);
  });
});
