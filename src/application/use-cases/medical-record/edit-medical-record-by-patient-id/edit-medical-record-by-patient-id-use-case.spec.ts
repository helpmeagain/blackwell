import { makePatient } from 'test/factories/make-patient';
import { EditMedicalRecordByIdUseCase } from './edit-medical-record-by-patient-id-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { CreateConsultationUseCase } from '../../consultation/create-consultation/create-consultation-use-case';

let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: EditMedicalRecordByIdUseCase;

describe('Edit a medical record', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientRepository();
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

    inMemoryConsultationRepository = new InMemoryConsultationRepository(
      inMemoryPatientRepository,
    );
    const consultation = new CreateConsultationUseCase(
      inMemoryConsultationRepository,
      inMemoryPatientRepository,
    );
    const consultationResult = await consultation.execute({
      clinicianId: '1',
      patientId: newPatient.id.toString(),
      room: 1,
      appointmentDate: new Date(),
    });

    const patientResult = await sut.execute({
      patientId: newPatient.id.toString(),
      diagnosis: 'diagnosis',
      comorbidity: 'comorbidity',
    });

    expect(patientResult.isRight()).toBe(true);
    expect(consultationResult.isRight()).toBe(true);
    if (patientResult.isRight() && consultationResult.isRight()) {
      expect(patientResult.value.medicalRecord.diagnosis).toBe('diagnosis');
      expect(
        patientResult.value.medicalRecord.consultationsIds.currentItems,
      ).toHaveLength(1);
      expect(patientResult.value.medicalRecord.consultationsIds.currentItems).toEqual(
        inMemoryConsultationRepository.items.map((consultation) => consultation.id),
      );
    }
  });
});
