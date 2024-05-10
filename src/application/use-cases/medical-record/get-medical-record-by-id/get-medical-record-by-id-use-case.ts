import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { MedicalRecord } from '@entities/medical-record';
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
    const medicalRecord = await this.repository.findRecordById(medicalRecordId);

    if (!medicalRecord) {
      return left(new ResourceNotFound());
    }

    await this.repository.saveRecord(medicalRecord);
    return right({ medicalRecord });
  }
}
