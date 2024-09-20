import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface getUniversalMedicalRecordByIdRequest {
  universalMedicalRecordId: string;
}

type getUniversalMedicalRecordByIdResponse = Either<
  ResourceNotFound,
  { universalMedicalRecord: UniversalMedicalRecord }
>;

export class GetUniversalMedicalRecordByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    universalMedicalRecordId,
  }: getUniversalMedicalRecordByIdRequest): Promise<getUniversalMedicalRecordByIdResponse> {
    const universalMedicalRecord = await this.repository.findRecordById(
      universalMedicalRecordId,
    );

    if (!universalMedicalRecord) {
      return left(new ResourceNotFound());
    }

    return right({ universalMedicalRecord });
  }
}
