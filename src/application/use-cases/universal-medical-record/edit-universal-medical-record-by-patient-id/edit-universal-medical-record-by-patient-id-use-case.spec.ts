import { makePatient } from 'test/factories/make-patient';
import { EditUniversalMedicalRecordByPatientIdUseCase } from './edit-universal-medical-record-by-patient-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: EditUniversalMedicalRecordByPatientIdUseCase;

describe('Edit a medical record', () => {
  beforeEach(() => {
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    inMemoryConsultationRepository = new InMemoryConsultationRepository(
      inMemoryUniversalMedicalRecordRepository,
    );
    inMemoryPatientRepository = new InMemoryPatientRepository();
    sut = new EditUniversalMedicalRecordByPatientIdUseCase(
      inMemoryUniversalMedicalRecordRepository,
    );
  });

  it('should be able to edit a medical record by id', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);
    await inMemoryUniversalMedicalRecordRepository.create(
      newPatient.universalMedicalRecord,
    );

    const result = await sut.execute({
      patientId: newPatient.id.toString(),
      diagnosis: 'diagnosis',
      comorbidity: 'comorbidity',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryUniversalMedicalRecordRepository.items[0].diagnosis).toBe('diagnosis');
  });

  it('should be able to edit a medical record and maintain the consultation ids', async () => {
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
      patientId: newPatient.id.toString(),
      diagnosis: 'diagnosis',
      comorbidity: 'comorbidity',
    });

    expect(patientResult.isRight()).toBe(true);
    expect(inMemoryUniversalMedicalRecordRepository.items[0].diagnosis).toBe('diagnosis');
    expect(
      inMemoryUniversalMedicalRecordRepository.items[0].consultationsIds.currentItems,
    ).toHaveLength(1);
    expect(
      inMemoryUniversalMedicalRecordRepository.items[0].consultationsIds.currentItems[0],
    ).toEqual(newConsultation.id);
  });
});
