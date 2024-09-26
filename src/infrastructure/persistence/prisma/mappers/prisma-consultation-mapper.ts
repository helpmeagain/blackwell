import { Consultation } from '@/domain/entities/consultation';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Consultation as PrismaConsultation, Prisma } from '@prisma/client';

export class PrismaConsultationMapper {
  static toDomain(raw: PrismaConsultation): Consultation {
    return Consultation.create(
      {
        patientId: new UniqueEntityId(raw.patientId),
        clinicianId: new UniqueEntityId(raw.clinicianId),
        universalMedicalRecordId: new UniqueEntityId(raw.universalMedicalRecordId),
        appointmentDate: raw.appointmentDate,
        room: raw.room,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(
    consultation: Consultation,
  ): Prisma.ConsultationUncheckedCreateInput {
    return {
      id: consultation.id.toString(),
      patientId: consultation.patientId.toString(),
      clinicianId: consultation.clinicianId.toString(),
      universalMedicalRecordId: consultation.universalMedicalRecordId.toString(),
      appointmentDate: consultation.appointmentDate,
      room: consultation.room,
    };
  }
}
