import { Either, left, right } from '@error/either';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { createCardiorespiratoryRecordRequest } from './create-record-request';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { RecordAlreadyExists } from '@/application/common/error-handler/errors/record-already-exists';

type createCardiorespiratoryRecordResponse = Either<
  RecordAlreadyExists | ResourceNotFound,
  { cardiorespiratoryRecord: CardiorespiratoryRecord }
>;

export class createCardiorespiratoryRecord {
  constructor(
    private readonly cardiorespiratoryRecordRepository: CardiorespiratoryRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(
    req: createCardiorespiratoryRecordRequest,
  ): Promise<createCardiorespiratoryRecordResponse> {
    const [patient, clinician] = await Promise.all([
      this.patientRepository.findById(req.patientId),
      this.clinicianRepository.findById(req.clinicianId),
    ]);

    if (!patient) {
      return left(new ResourceNotFound('Patient'));
    }

    if (!clinician) {
      return left(new ResourceNotFound('Clinician'));
    }

    const previousCardiorespiratoryRecord =
      await this.cardiorespiratoryRecordRepository.findByPatientId(req.patientId);

    if (previousCardiorespiratoryRecord) {
      return left(
        new RecordAlreadyExists(patient.name, patient.surname, 'Cardiorespiratory'),
      );
    }

    const cardiorespiratoryRecord = CardiorespiratoryRecord.create({
      clinicianId: new UniqueEntityId(req.clinicianId),
      patientId: new UniqueEntityId(req.patientId),
      universalMedicalRecordId: patient.universalMedicalRecord.id,
      medicalDiagnosis: req.medicalDiagnosis,
      anamnesis: req.anamnesis,
      physicalExamination: req.physicalExamination,
      triage: req.triage,
      lifestyleHabits: req.lifestyleHabits,
      physicalInspection: req.physicalInspection,
      VitalSigns: req.VitalSigns,
      pneumofunctionalAssessment: req.pneumofunctionalAssessment,
      cardiofunctionalAssessment: req.cardiofunctionalAssessment,
    });

    await this.cardiorespiratoryRecordRepository.create(cardiorespiratoryRecord);
    return right({ cardiorespiratoryRecord });
  }
}
