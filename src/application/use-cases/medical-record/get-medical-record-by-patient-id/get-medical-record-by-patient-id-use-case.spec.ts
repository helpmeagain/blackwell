import { GetMedicalRecordByPatientIdUseCase } from './get-medical-record-by-patient-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

let inMemoryRepository: InMemoryPatientRepository;
let sut: GetMedicalRecordByPatientIdUseCase;

describe('Get MedicalRecord By Patient Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    sut = new GetMedicalRecordByPatientIdUseCase(inMemoryRepository);
  });

  it('should be able to get a medical record by id', async () => {
    const newPatient = makePatient();
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      patientId: newPatient.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight())
      expect(result.value.medicalRecord.patientId.toString()).toEqual(
        newPatient.id.toString(),
      );
  });

  it('should not be able to get a medical record if incorrect id', async () => {
    const newPatient = makePatient();
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      patientId: 'incorrect-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFound);
  });
});
