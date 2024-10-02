import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';

interface editUniversalMedicalRecordByIdRequest {
  universalMedicalRecordId: string;
  profession: string;
  emergencyContactEmail: string;
  emergencyContactNumber: string;
  maritalStatus: string;
  height: number;
  weight: number;
  allergies: string[];
  diagnosis: string[];
  medicationsInUse: string[];
}

type editUniversalMedicalRecordByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { universalMedicalRecord: UniversalMedicalRecord }
>;

export class EditUniversalMedicalRecordByIdUseCase {
  constructor(private readonly repository: UniversalMedicalRecordRepository) {}

  async execute(
    req: editUniversalMedicalRecordByIdRequest,
  ): Promise<editUniversalMedicalRecordByIdResponse> {
    const {
      universalMedicalRecordId,
      profession,
      emergencyContactEmail,
      emergencyContactNumber,
      allergies,
      maritalStatus,
      height,
      weight,
      diagnosis,
      medicationsInUse,
    } = req;
    const universalMedicalRecord = await this.repository.findById(
      universalMedicalRecordId,
    );

    if (!universalMedicalRecord) {
      return left(new ResourceNotFound('Universal Medical Record'));
    }

    universalMedicalRecord.diagnosis = diagnosis;
    universalMedicalRecord.profession = profession;
    universalMedicalRecord.emergencyContactEmail = emergencyContactEmail;
    universalMedicalRecord.emergencyContactNumber = emergencyContactNumber;
    universalMedicalRecord.allergies = allergies;
    universalMedicalRecord.maritalStatus = maritalStatus;
    universalMedicalRecord.height = height;
    universalMedicalRecord.weight = weight;
    universalMedicalRecord.medicationsInUse = medicationsInUse;

    await this.repository.save(universalMedicalRecord);
    return right({ universalMedicalRecord });
  }
}
