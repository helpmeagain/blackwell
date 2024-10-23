import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

interface editUniversalMedicalRecordByPatientIdRequest {
  patientId: string;
  currentUserId: string;
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
  ResourceNotFound | UnauthorizedUser,
  { universalMedicalRecord: UniversalMedicalRecord }
>;

export class EditUniversalMedicalRecordByPatientIdUseCase {
  constructor(private readonly repository: UniversalMedicalRecordRepository) {}

  async execute(
    req: editUniversalMedicalRecordByPatientIdRequest,
  ): Promise<editUniversalMedicalRecordByIdResponse> {
    const {
      patientId,
      currentUserId,
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
    const universalMedicalRecord = await this.repository.findByPatientId(patientId);

    if (!universalMedicalRecord) {
      return left(new ResourceNotFound());
    }

    if (currentUserId !== universalMedicalRecord.patientId.toString()) {
      return left(new UnauthorizedUser());
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
