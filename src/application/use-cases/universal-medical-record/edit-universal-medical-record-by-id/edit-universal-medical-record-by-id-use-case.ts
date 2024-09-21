import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';

interface editUniversalMedicalRecordByIdRequest {
  universalMedicalRecordId: string;
  profession: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  cpf: string;
  allergies: string;
  maritalStatus: string;
  height: number;
  weight: number;
  diagnosis: string[];
  medicationsInUse?: string;
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
      emergencyContactName,
      emergencyContactNumber,
      cpf,
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
    universalMedicalRecord.emergencyContactName = emergencyContactName;
    universalMedicalRecord.emergencyContactNumber = emergencyContactNumber;
    universalMedicalRecord.cpf = cpf;
    universalMedicalRecord.allergies = allergies;
    universalMedicalRecord.maritalStatus = maritalStatus;
    universalMedicalRecord.height = height;
    universalMedicalRecord.weight = weight;
    universalMedicalRecord.medicationsInUse = medicationsInUse;

    await this.repository.save(universalMedicalRecord);
    return right({ universalMedicalRecord });
  }
}
