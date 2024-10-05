import { Either, left, right } from '@error/either';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { createNeurofunctionalRecordRequest } from './create-neurofunctional-record-request';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { RecordAlreadyExists } from '@/application/common/error-handler/errors/record-already-exists';

type createNeurofunctionalRecordResponse = Either<
  RecordAlreadyExists | ResourceNotFound,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class createNeurofunctionalRecord {
  constructor(
    private readonly neurofunctionalRecordRepository: NeurofunctionalRecordRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(
    req: createNeurofunctionalRecordRequest,
  ): Promise<createNeurofunctionalRecordResponse> {
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

    const previousNeurofunctionalRecord =
      await this.neurofunctionalRecordRepository.findByPatientId(req.patientId);

    if (previousNeurofunctionalRecord) {
      return left(
        new RecordAlreadyExists(patient.name, patient.surname, 'Neurofunctional'),
      );
    }

    const neurofunctionalRecord = NeurofunctionalRecord.create({
      clinicianId: new UniqueEntityId(req.clinicianId),
      patientId: new UniqueEntityId(req.patientId),
      universalMedicalRecordId: patient.universalMedicalRecord.id,
      medicalDiagnosis: req.medicalDiagnosis,
      anamnesis: req.anamnesis,
      physicalExamination: req.physicalExamination,
      triage: req.triage,
      lifestyleHabits: req.lifestyleHabits,
      vitalSigns: req.vitalSigns,
      physicalInspection: req.physicalInspection,
      sensoryAssessment: req.sensoryAssessment,
      patientMobility: req.patientMobility,
      physiotherapyAssessment: req.physiotherapyAssessment,
    });

    await this.neurofunctionalRecordRepository.create(neurofunctionalRecord);
    return right({ neurofunctionalRecord });
  }
}
