import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { MedicalRecord } from '@entities/medical-record';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface getMedicalRecordByPatientIdRequest {
  patientId: string;
}

type getMedicalRecordByPatientIdResponse = Either<
  ResourceNotFound,
  { medicalRecord: MedicalRecord }
>;

export class GetMedicalRecordByPatientIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
  }: getMedicalRecordByPatientIdRequest): Promise<getMedicalRecordByPatientIdResponse> {
    const medicalRecord = await this.repository.findRecordByPatientId(patientId);

    if (!medicalRecord) {
      return left(new ResourceNotFound());
    }

    return right({ medicalRecord });
  }
}
