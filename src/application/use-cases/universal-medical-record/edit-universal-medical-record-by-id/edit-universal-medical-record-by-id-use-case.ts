import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface editUniversalMedicalRecordByIdRequest {
  universalMedicalRecordId: string;
  diagnosis: string;
  comorbidity: string;
}

type editUniversalMedicalRecordByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { universalMedicalRecord: UniversalMedicalRecord }
>;

export class EditUniversalMedicalRecordByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute(
    req: editUniversalMedicalRecordByIdRequest,
  ): Promise<editUniversalMedicalRecordByIdResponse> {
    const { universalMedicalRecordId, diagnosis, comorbidity } = req;
    const universalMedicalRecord = await this.repository.findRecordById(
      universalMedicalRecordId,
    );

    if (!universalMedicalRecord) {
      return left(new ResourceNotFound('Universal Medical Record'));
    }

    universalMedicalRecord.diagnosis = diagnosis;
    universalMedicalRecord.comorbidity = comorbidity;

    await this.repository.saveRecord(universalMedicalRecord);
    return right({ universalMedicalRecord });
  }
}
