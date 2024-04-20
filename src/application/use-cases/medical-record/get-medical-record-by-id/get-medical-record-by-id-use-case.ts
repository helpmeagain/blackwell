import { MedicalRecord } from '@entities/medical-record';
import { Either, left, right } from '@/application/common/error-handler/either';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface getMedicalRecordByIdRequest {
  medicalRecordId: string;
}

type getMedicalRecordByIdResponse = Either<
  ResourceNotFound,
  { medicalRecord: MedicalRecord }
>;

export class GetMedicalRecordByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    medicalRecordId,
  }: getMedicalRecordByIdRequest): Promise<getMedicalRecordByIdResponse> {
    const medicalRecord = await this.repository.findMedicalRecordById(medicalRecordId);

    if (!medicalRecord) {
      return left(new ResourceNotFound());
    }

    await this.repository.saveMedicalRecord(medicalRecord);
    return right({ medicalRecord });
  }
}
