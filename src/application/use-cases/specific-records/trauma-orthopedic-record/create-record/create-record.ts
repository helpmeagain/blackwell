import { Either, left, right } from '@error/either';
import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { createTraumaOrthopedicRecordRequest } from './create-record-request';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { RecordAlreadyExists } from '@/application/common/error-handler/errors/record-already-exists';

type createTraumaOrthopedicRecordResponse = Either<
  RecordAlreadyExists | ResourceNotFound,
  { traumaorthopedicRecord: TraumaOrthopedicRecord }
>;

export class createTraumaOrthopedicRecord {
  constructor(
    private readonly traumaorthopedicRecordRepository: TraumaOrthopedicRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(
    req: createTraumaOrthopedicRecordRequest,
  ): Promise<createTraumaOrthopedicRecordResponse> {
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

    const previousTraumaOrthopedicRecord =
      await this.traumaorthopedicRecordRepository.findByPatientId(req.patientId);

    if (previousTraumaOrthopedicRecord) {
      return left(
        new RecordAlreadyExists(patient.name, patient.surname, 'TraumaOrthopedic'),
      );
    }

    const traumaorthopedicRecord = TraumaOrthopedicRecord.create({
      clinicianId: new UniqueEntityId(req.clinicianId),
      patientId: new UniqueEntityId(req.patientId),
      universalMedicalRecordId: patient.universalMedicalRecord.id,
      medicalDiagnosis: req.medicalDiagnosis,
      anamnesis: req.anamnesis,
      physicalExamination: req.physicalExamination,
      triage: req.triage,
      palpation: req.palpation,
      edema: req.edema,
      pittingTest: req.pittingTest,
      fingerPressureTest: req.fingerPressureTest,
      perimetry: req.perimetry,
      subjectivePainAssessment: req.subjectivePainAssessment,
      specialOrthopedicTest: req.specialOrthopedicTest,
    });

    await this.traumaorthopedicRecordRepository.create(traumaorthopedicRecord);
    return right({ traumaorthopedicRecord });
  }
}
