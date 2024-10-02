import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';

interface editUniversalMedicalRecordByPatientIRequest {
  patientId: string;
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

export class EditUniversalMedicalRecordByPatientIdUseCase {
  constructor(private readonly repository: UniversalMedicalRecordRepository) {}

  async execute(
    req: editUniversalMedicalRecordByPatientIRequest,
  ): Promise<editUniversalMedicalRecordByIdResponse> {
    const {
      patientId,
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
