import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { PatientRepository } from '@/application/repositories/patient-repository';

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
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
    diagnosis,
    comorbidity,
  }: editUniversalMedicalRecordByIdRequest): Promise<editUniversalMedicalRecordByIdResponse> {
    const medicalRecord = await this.repository.findRecordByPatientId(patientId);

    if (!medicalRecord) {
      return left(new ResourceNotFound());
    }

    medicalRecord.diagnosis = diagnosis;
    medicalRecord.comorbidity = comorbidity;

    await this.repository.saveRecord(medicalRecord);
    return right({ medicalRecord });
  }
}
