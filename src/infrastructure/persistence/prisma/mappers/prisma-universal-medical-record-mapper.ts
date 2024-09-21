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
        comorbidity: raw.comorbidity,
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
      diagnosis: universalMedicalRecord.diagnosis,
      comorbidity: universalMedicalRecord.comorbidity,
    };
  }
}
