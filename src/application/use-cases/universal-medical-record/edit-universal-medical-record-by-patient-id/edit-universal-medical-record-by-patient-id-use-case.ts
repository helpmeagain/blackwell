import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';

interface editUniversalMedicalRecordByIdRequest {
  patientId: string;
  diagnosis: string;
  comorbidity: string;
}

type editUniversalMedicalRecordByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { medicalRecord: UniversalMedicalRecord }
>;

export class EditUniversalMedicalRecordByPatientIdUseCase {
  constructor(private readonly repository: UniversalMedicalRecordRepository) {}

  async execute({
    patientId,
    diagnosis,
    comorbidity,
  }: editUniversalMedicalRecordByIdRequest): Promise<editUniversalMedicalRecordByIdResponse> {
    const medicalRecord = await this.repository.findByPatientId(patientId);

    if (!medicalRecord) {
      return left(new ResourceNotFound());
    }

    medicalRecord.diagnosis = diagnosis;
    medicalRecord.comorbidity = comorbidity;

    await this.repository.save(medicalRecord);
    return right({ medicalRecord });
  }
}
