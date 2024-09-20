import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface getUniversalMedicalRecordByPatientIdRequest {
  patientId: string;
}

type getUniversalMedicalRecordByPatientIdResponse = Either<
  ResourceNotFound,
  { universalmedicalRecord: UniversalMedicalRecord }
>;

export class GetUniversalMedicalRecordByPatientIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
  }: getUniversalMedicalRecordByPatientIdRequest): Promise<getUniversalMedicalRecordByPatientIdResponse> {
    const universalmedicalRecord = await this.repository.findRecordByPatientId(patientId);

    if (!universalmedicalRecord) {
      return left(new ResourceNotFound());
    }

    return right({ universalmedicalRecord });
  }
}
