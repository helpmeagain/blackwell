import { Either, left, right } from '@error/either';
import { Triage } from '@/domain/common/types/triage-type';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

interface editNeurofunctionalRecordRequest {
  id: string;
  medicalDiagnosis: string;
  anamnesis: string;
  physicalExamination: string;
  triage: Triage;
  specialNeurofunctionalTests1: string;
  specialNeurofunctionalTests2: string;
}

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
    const {
      id,
      medicalDiagnosis,
      anamnesis,
      physicalExamination,
      triage,
      specialNeurofunctionalTests1,
      specialNeurofunctionalTests2,
    } = req;

    const neurofunctionalRecord = await this.neurofunctionalRecordRepository.findById(id);

    if (!neurofunctionalRecord) {
      return left(new ResourceNotFound());
    }

    neurofunctionalRecord.medicalDiagnosis = medicalDiagnosis;
    neurofunctionalRecord.anamnesis = anamnesis;
    neurofunctionalRecord.physicalExamination = physicalExamination;
    neurofunctionalRecord.triage = triage;
    neurofunctionalRecord.specialNeurofunctionalTests1 = specialNeurofunctionalTests1;
    neurofunctionalRecord.specialNeurofunctionalTests2 = specialNeurofunctionalTests2;

    await this.neurofunctionalRecordRepository.save(neurofunctionalRecord);
    return right({ neurofunctionalRecord });
  }
}
