import { GetMedicalRecordByIdUseCase } from './get-medical-record-by-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

let inMemoryRepository: InMemoryPatientRepository;
let sut: GetMedicalRecordByIdUseCase;

describe('Get MedicalRecord By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    sut = new GetMedicalRecordByIdUseCase(inMemoryRepository);
  });

  it('should be able to get a medical record by id', async () => {
    const newPatient = makePatient();
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      medicalRecordId: newPatient.medicalRecord.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.medicalRecord.id).toEqual(newPatient.medicalRecord.id);
    }
  });

  it('should not be able to get a medical record if incorrect id', async () => {
    const newPatient = makePatient();
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      medicalRecordId: 'incorrect-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFound);
  });
});
