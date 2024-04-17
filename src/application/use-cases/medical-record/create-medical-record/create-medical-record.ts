import { Either, right } from '@application/common/error-handler/either';
import { MedicalRecord } from '@entities/medical-record';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { type MedicalRecordRepository } from '@/application/repositories/medical-record-repository';

interface createMedicalRecordRequest {
  patientId: string;
  clinicianId: string;
  diagnosis: string;
  comorbidity: string;
}

type createMedicalRecordResponse = Either<null, { medicalRecord: MedicalRecord }>;

export class CreateMedicalRecordUseCase {
  constructor(private readonly repository: MedicalRecordRepository) {}

  async execute({
    clinicianId,
    patientId,
    diagnosis,
    comorbidity,
  }: createMedicalRecordRequest): Promise<createMedicalRecordResponse> {
    const medicalRecord = MedicalRecord.create({
      clinicianId: new UniqueEntityId(clinicianId),
      patientId: new UniqueEntityId(patientId),
      diagnosis,
      comorbidity,
    });

    await this.repository.create(medicalRecord);
    return right({ medicalRecord });
  }
}
