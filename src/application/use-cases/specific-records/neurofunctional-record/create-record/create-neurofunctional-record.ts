import { Either, right } from '@error/either';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { createNeurofunctionalRecordRequest } from './create-neurofunctional-record-request';

type createNeurofunctionalRecordResponse = Either<
  null,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class createNeurofunctionalRecord {
  constructor(
    private readonly neurofunctionalRecordRepository: NeurofunctionalRecordRepository,
  ) {}

  async execute(
    req: createNeurofunctionalRecordRequest,
  ): Promise<createNeurofunctionalRecordResponse> {
    const neurofunctionalRecord = NeurofunctionalRecord.create({
      clinicianId: new UniqueEntityId(req.clinicianId),
      patientId: new UniqueEntityId(req.patientId),
      universalMedicalRecordId: new UniqueEntityId(req.universalMedicalRecordId),
      medicalDiagnosis: req.medicalDiagnosis,
      anamnesis: req.anamnesis,
      physicalExamination: req.physicalExamination,
      physiotherapyDepartment: 'Neurofunctional',
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
