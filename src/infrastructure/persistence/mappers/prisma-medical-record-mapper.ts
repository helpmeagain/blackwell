import { MedicalRecord } from '@/domain/entities/medical-record';
import { Prisma } from '@prisma/client';

export class PrismaMedicalRecordMapper {
  static toPersistence(
    medicalRecord: MedicalRecord,
  ): Prisma.MedicalRecordUncheckedCreateInput {
    return {
      id: medicalRecord.id.toString(),
      patientId: medicalRecord.patientId.toString(),
      diagnosis: medicalRecord.diagnosis,
      comorbidity: medicalRecord.comorbidity,
    };
  }
}
