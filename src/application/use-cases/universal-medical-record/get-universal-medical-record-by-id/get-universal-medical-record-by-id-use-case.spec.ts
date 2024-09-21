import { GetUniversalMedicalRecordByIdUseCase } from './get-universal-medical-record-by-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let sut: GetUniversalMedicalRecordByIdUseCase;

describe('Get Universal Medical Record By Id', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    sut = new GetUniversalMedicalRecordByIdUseCase(
      inMemoryUniversalMedicalRecordRepository,
    );
  });

  it('should be able to get a universal medical record by id', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryUniversalMedicalRecordRepository.create(
      newPatient.universalMedicalRecord,
    );

    const result = await sut.execute({
      universalMedicalRecordId: newPatient.universalMedicalRecord.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.universalMedicalRecord.id).toEqual(
        newPatient.universalMedicalRecord.id,
      );
    }
  });

  it('should not be able to get a universalmedical record if incorrect id', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);

    const result = await sut.execute({
      universalMedicalRecordId: 'incorrect-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFound);
  });
});
