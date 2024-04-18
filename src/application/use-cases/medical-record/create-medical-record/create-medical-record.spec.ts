import { makePatient } from 'test/factories/make-patient';
import { CreateMedicalRecordUseCase } from './create-medical-record';
import { InMemoryMedicalRecordRepository } from 'test/repositories/in-memory-medical-record-repository';

let inMemoryRepository: InMemoryMedicalRecordRepository;
let sut: CreateMedicalRecordUseCase;

describe('Create medical record', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryMedicalRecordRepository();
    sut = new CreateMedicalRecordUseCase(inMemoryRepository);
  });

  it('should be able to create a medical record', async () => {
    const newPatient = makePatient({});
    const result = await sut.execute({
      clinicianId: 'id-1',
      patientId: newPatient.id.toString(),
      diagnosis: 'Tuberculosis',
      comorbidity: 'HIV',
    });

    expect(result.isRight()).toBe(true);
    console.log(result.value?.medicalRecord);
  });
});
