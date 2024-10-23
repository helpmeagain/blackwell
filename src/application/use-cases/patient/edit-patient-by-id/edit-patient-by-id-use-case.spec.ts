import { EditPatientByIdUseCase } from './edit-patient-by-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';
import { FakeHasher } from 'test/cryptography/fake-hasher';

let inMemoryRepository: InMemoryPatientRepository;
let fakeHasher: FakeHasher;
let sut: EditPatientByIdUseCase;

describe('Edit a patient By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    fakeHasher = new FakeHasher();
    sut = new EditPatientByIdUseCase(inMemoryRepository, fakeHasher);
  });

  it('should be able to edit a patient by id', async () => {
    const newPatient = makePatient({});
    await inMemoryRepository.create(newPatient);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = await sut.execute({
      patientId: newPatient.id.toString(),
      currentUserId: newPatient.id.toString(),
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      birthDate: new Date(1990, 0, 1),
      cpf: '123456789',
      phoneNumber: '123456789',
      address: 'address',
      city: 'city',
      state: 'state',
      email: 'johndoe@email.com',
      password: 'password',
    });

    expect(result.isRight()).toBe(true);
  });
});
