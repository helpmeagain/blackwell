import { Either, left, right } from '@error/either';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { editNeurofunctionalRecordRequest } from './edit-neurofunctional-record-by-id-request';

type editNeurofunctionalRecordResponse = Either<
  ResourceNotFound,
  { neurofunctionalRecord: NeurofunctionalRecord }
>;

export class editNeurofunctionalRecord {
  constructor(
    private readonly neurofunctionalRecordRepository: NeurofunctionalRecordRepository,
  ) {}

  async execute(
    req: editNeurofunctionalRecordRequest,
  ): Promise<editNeurofunctionalRecordResponse> {
    const neurofunctionalRecord = await this.neurofunctionalRecordRepository.findById(
      req.id,
    );

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    neurofunctionalRecord.medicalDiagnosis = req.medicalDiagnosis;
    neurofunctionalRecord.anamnesis = req.anamnesis;
    neurofunctionalRecord.physicalExamination = req.physicalExamination;
    neurofunctionalRecord.triage = req.triage;
    neurofunctionalRecord.lifestyleHabits = req.lifestyleHabits;
    neurofunctionalRecord.vitalSigns = req.vitalSigns;
    neurofunctionalRecord.physicalInspection = req.physicalInspection;
    neurofunctionalRecord.sensoryAssessment = req.sensoryAssessment;
    neurofunctionalRecord.patientMobility = req.patientMobility;
    neurofunctionalRecord.physiotherapyAssessment = req.physiotherapyAssessment;

    await this.neurofunctionalRecordRepository.save(neurofunctionalRecord);
    return right({ neurofunctionalRecord });
  }
}
