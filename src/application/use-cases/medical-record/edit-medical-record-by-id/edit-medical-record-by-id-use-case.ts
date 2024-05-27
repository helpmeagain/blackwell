import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { MedicalRecord } from '@entities/medical-record';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface editMedicalRecordByIdRequest {
  medicalRecordId: string;
  diagnosis: string;
  comorbidity: string;
}

type editMedicalRecordByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { medicalRecord: MedicalRecord }
>;

export class EditMedicalRecordByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute(
    req: editMedicalRecordByIdRequest,
  ): Promise<editMedicalRecordByIdResponse> {
    const { medicalRecordId, diagnosis, comorbidity } = req;
    const medicalRecord = await this.repository.findRecordById(medicalRecordId);

    if (!medicalRecord) {
      return left(new ResourceNotFound('Medical Record'));
    }

    medicalRecord.diagnosis = diagnosis;
    medicalRecord.comorbidity = comorbidity;

    await this.repository.saveRecord(medicalRecord);
    return right({ medicalRecord });
  }
}
