import { MedicalRecord } from '@/domain/entities/medical-record';
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
      gender: 'male',
      birthDate: new Date(),
      phoneNumber: '+1234567890',
      email: 'jonhdoe@email.com',
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
      phoneNumber: '+1234567890',
      email: 'jonhdoe@email.com',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.patient.medicalRecord).toBeInstanceOf(MedicalRecord);
      expect(result.value.patient.medicalRecord.id).toBeTruthy();
      expect(result.value.patient.medicalRecord.patientId).toEqual(
        result.value.patient.id,
      );
    }
  });

  it('should not be able to create a patient with invalid email', async () => {
    const result = await sut.execute({
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      birthDate: new Date(),
      phoneNumber: '+1234567890',
      email: 'jonhdoeemail.com',
    });

    expect(result.isLeft()).toBe(true);
  });
});
