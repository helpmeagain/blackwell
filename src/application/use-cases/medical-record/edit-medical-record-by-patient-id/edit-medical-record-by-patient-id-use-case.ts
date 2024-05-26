import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { MedicalRecord } from '@entities/medical-record';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface editMedicalRecordByIdRequest {
  patientId: string;
  diagnosis: string;
  comorbidity: string;
}

type editMedicalRecordByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { medicalRecord: MedicalRecord }
>;

export class EditMedicalRecordByPatientIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
    diagnosis,
    comorbidity,
  }: editMedicalRecordByIdRequest): Promise<editMedicalRecordByIdResponse> {
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
