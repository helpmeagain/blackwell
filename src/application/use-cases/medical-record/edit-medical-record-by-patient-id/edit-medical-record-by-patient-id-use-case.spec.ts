import { makePatient } from 'test/factories/make-patient';
import { EditMedicalRecordByIdUseCase } from './edit-medical-record-by-patient-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';

let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: EditMedicalRecordByIdUseCase;

describe('Edit a medical record', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryConsultationRepository = new InMemoryConsultationRepository(
      inMemoryPatientRepository,
    );
    sut = new EditMedicalRecordByIdUseCase(inMemoryPatientRepository);
  });

  it('should be able to edit a medical record by id', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);

    const result = await sut.execute({
      patientId: newPatient.id.toString(),
      diagnosis: 'diagnosis',
      comorbidity: 'comorbidity',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryPatientRepository.items[0].medicalRecord.diagnosis).toBe('diagnosis');
  });

  it('should be able to edit a medical record and maintain the consultation ids', async () => {
    const newPatient = makePatient();
    await inMemoryPatientRepository.create(newPatient);

    const newConsultation = makeConsultation({
      patientId: newPatient.id,
      medicalRecordId: newPatient.medicalRecord.id,
    });
    await inMemoryConsultationRepository.create(newConsultation);

    const patientResult = await sut.execute({
      patientId: newPatient.id.toString(),
      diagnosis: 'diagnosis',
      comorbidity: 'comorbidity',
    });

    expect(patientResult.isRight()).toBe(true);
    expect(inMemoryPatientRepository.items[0].medicalRecord.diagnosis).toBe('diagnosis');
    expect(
      inMemoryPatientRepository.items[0].medicalRecord.consultationsIds.currentItems,
    ).toHaveLength(1);
    expect(
      inMemoryPatientRepository.items[0].medicalRecord.consultationsIds.currentItems[0],
    ).toEqual(newConsultation.id);
  });
});
