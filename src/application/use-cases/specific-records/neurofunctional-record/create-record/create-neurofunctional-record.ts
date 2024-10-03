import { Either, right } from '@error/either';
import { Triage } from '@/domain/common/types/triage-type';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

interface createNeurofunctionalRecordRequest {
  clinicianId: string;
  patientId: string;
  universalMedicalRecordId: string;
  medicalDiagnosis: string;
  anamnesis: string;
  physicalExamination: string;
  triage: Triage;
  specialNeurofunctionalTests1: string;
  specialNeurofunctionalTests2: string;
}

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
    const {
      clinicianId,
      patientId,
      universalMedicalRecordId,
      medicalDiagnosis,
      anamnesis,
      physicalExamination,
      triage,
      specialNeurofunctionalTests1,
      specialNeurofunctionalTests2,
    } = req;

    const neurofunctionalRecord = NeurofunctionalRecord.create({
      clinicianId: new UniqueEntityId(clinicianId),
      patientId: new UniqueEntityId(patientId),
      universalMedicalRecordId: new UniqueEntityId(universalMedicalRecordId),
      medicalDiagnosis,
      anamnesis,
      physicalExamination,
      physiotherapyDepartment: 'Neurofunctional',
      triage,
      specialNeurofunctionalTests1,
      specialNeurofunctionalTests2,
    });

    await this.neurofunctionalRecordRepository.create(neurofunctionalRecord);
    return right({ neurofunctionalRecord });
  }
}
