// import { ConsultationIdList } from '@/domain/entities/consultation-list';
import { ConsultationIdList } from '@/domain/entities/consultation-list';
import { MedicalRecord } from '@/domain/entities/medical-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { MedicalRecord as PrismaMedicalRecord, Prisma } from '@prisma/client';

export class PrismaMedicalRecordMapper {
  static toDomain(raw: PrismaMedicalRecord): MedicalRecord {
    const medicalRecord = MedicalRecord.create(
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

    return medicalRecord;
  }

  static toPersistence(
    medicalRecord: MedicalRecord,
  ): Prisma.MedicalRecordUncheckedCreateInput {
    return {
      id: medicalRecord.id.toString(),
      patientId: medicalRecord.patientId.toString(),
      // consultationId: medicalRecord.consultationsIds.currentItems.map((id) =>
      //   id.toString(),
      // ),
      diagnosis: medicalRecord.diagnosis,
      comorbidity: medicalRecord.comorbidity,
    };
  }
}
