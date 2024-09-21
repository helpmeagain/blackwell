import { GetUniversalMedicalRecordByPatientIdUseCase } from './get-universal-medical-record-by-patient-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let sut: GetUniversalMedicalRecordByPatientIdUseCase;

describe('Get Universal MedicalRecord By Patient Id', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    sut = new GetUniversalMedicalRecordByPatientIdUseCase(
      inMemoryUniversalMedicalRecordRepository,
    );
  });

  it('should be able to get a universal medical record by patient id', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryUniversalMedicalRecordRepository.create(
      newPatient.universalMedicalRecord,
    );

    const result = await sut.execute({
      patientId: newPatient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight())
      expect(result.value.universalmedicalRecord.patientId.toString()).toEqual(
        newPatient.id.toString(),
      );
  });

  it('should not be able to get a universal medical record if incorrect id', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);

    const result = await sut.execute({
      patientId: 'incorrect-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFound);
  });
});
