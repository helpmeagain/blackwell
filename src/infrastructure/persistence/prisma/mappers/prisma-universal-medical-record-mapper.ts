// import { ConsultationIdList } from '@/domain/entities/consultation-list';
import { ConsultationIdList } from '@/domain/entities/consultation-list';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import {
  UniversalMedicalRecord as PrismaUniversalMedicalRecord,
  Prisma,
} from '@prisma/client';

export class PrismaUniversalMedicalRecordMapper {
  static toDomain(raw: PrismaUniversalMedicalRecord): UniversalMedicalRecord {
    const universalMedicalRecord = UniversalMedicalRecord.create(
      {
        patientId: new UniqueEntityId(raw.patientId),
        consultationsIds: new ConsultationIdList(
          raw.consultationId.map((id) => new UniqueEntityId(id)),
        ),
        diagnosis: raw.diagnosis,
        profession: raw.profession,
        emergencyContactEmail: raw.emergencyContactEmail,
        emergencyContactNumber: raw.emergencyContactNumber,
        allergies: raw.allergies,
        maritalStatus: raw.maritalStatus,
        height: raw.height,
        weight: raw.weight,
        medicationsInUse: raw.medicationsInUse,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );

    return universalMedicalRecord;
  }

  static toPersistence(
    universalMedicalRecord: UniversalMedicalRecord,
  ): Prisma.UniversalMedicalRecordUncheckedCreateInput {
    return {
      id: universalMedicalRecord.id.toString(),
      patientId: universalMedicalRecord.patientId.toString(),
      // consultationId: medicalRecord.consultationsIds.currentItems.map((id) =>
      //   id.toString(),
      // ),
      diagnosis: universalMedicalRecord.diagnosis ?? [],
      profession: universalMedicalRecord.profession,
      emergencyContactEmail: universalMedicalRecord.emergencyContactEmail,
      emergencyContactNumber: universalMedicalRecord.emergencyContactNumber,
      allergies: universalMedicalRecord.allergies,
      maritalStatus: universalMedicalRecord.maritalStatus,
      height: universalMedicalRecord.height,
      weight: universalMedicalRecord.weight,
      medicationsInUse: universalMedicalRecord.medicationsInUse ?? [],
      createdAt: universalMedicalRecord.createdAt,
      updatedAt: universalMedicalRecord.updatedAt,
    };
  }
}
