import { makePatient } from 'test/factories/make-patient';
import { EditUniversalMedicalRecordByIdUseCase } from './edit-universal-medical-record-by-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: EditUniversalMedicalRecordByIdUseCase;

describe('Edit a Universal medical record', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    inMemoryConsultationRepository = new InMemoryConsultationRepository(
      inMemoryUniversalMedicalRecordRepository,
    );
    sut = new EditUniversalMedicalRecordByIdUseCase(
      inMemoryUniversalMedicalRecordRepository,
    );
  });

  it('should be able to edit a universal medical record by id', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryUniversalMedicalRecordRepository.create(
      newPatient.universalMedicalRecord,
    );

    const result = await sut.execute({
      universalMedicalRecordId: newPatient.universalMedicalRecord.id.toString(),
      diagnosis: 'diagnosis',
      comorbidity: 'comorbidity',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryPatientRepository.items[0].universalMedicalRecord.diagnosis).toBe(
      'diagnosis',
    );
  });

  it('should be able to edit a universal medical record and maintain the consultation ids', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryUniversalMedicalRecordRepository.create(
      newPatient.universalMedicalRecord,
    );

    const newConsultation = makeConsultation({
      patientId: newPatient.id,
      universalMedicalRecordId: newPatient.universalMedicalRecord.id,
    });
    await inMemoryConsultationRepository.create(newConsultation);

    const patientResult = await sut.execute({
      universalMedicalRecordId: newPatient.universalMedicalRecord.id.toString(),
      diagnosis: 'diagnosis',
      comorbidity: 'comorbidity',
    });

    expect(patientResult.isRight()).toBe(true);
    expect(inMemoryPatientRepository.items[0].universalMedicalRecord.diagnosis).toBe(
      'diagnosis',
    );
    expect(
      inMemoryPatientRepository.items[0].universalMedicalRecord.consultationsIds
        .currentItems,
    ).toHaveLength(1);
    expect(
      inMemoryPatientRepository.items[0].universalMedicalRecord.consultationsIds
        .currentItems[0],
    ).toEqual(newConsultation.id);
  });
});
