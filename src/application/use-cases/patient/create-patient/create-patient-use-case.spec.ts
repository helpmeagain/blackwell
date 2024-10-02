import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { CreatePatientUseCase } from './create-patient-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let fakeHasher: FakeHasher;
let sut: CreatePatientUseCase;

describe('Create Patient', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    fakeHasher = new FakeHasher();
    sut = new CreatePatientUseCase(
      inMemoryPatientRepository,
      inMemoryUniversalMedicalRecordRepository,
      fakeHasher,
    );
  });

  it('should be able to create a patient', async () => {
    const result = await sut.execute({
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      birthDate: new Date(),
      cpf: '123456789',
      phoneNumber: '+1234567890',
      address: 'address',
      city: 'city',
      state: 'state',
      email: 'jonhdoe@email.com',
      password: 'password',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.patient.name).toBe('John');
      expect(result.value.patient.email).toBe('jonhdoe@email.com');
    }
  });

  it('should be able to create a medical record alongside the patient', async () => {
    const result = await sut.execute({
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      birthDate: new Date(),
      cpf: '123456789',
      phoneNumber: '+1234567890',
      address: 'address',
      city: 'city',
      state: 'state',
      email: 'jonhdoe@email.com',
      password: 'password',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.patient.universalMedicalRecord).toBeInstanceOf(
        UniversalMedicalRecord,
      );
      expect(result.value.patient.universalMedicalRecord.id).toBeTruthy();
      expect(result.value.patient.universalMedicalRecord.patientId).toEqual(
        result.value.patient.id,
      );
    }
  });
});
