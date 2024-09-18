import { fakerPT_BR as faker } from '@faker-js/faker';
import { Consultation, consultationProps } from '@/domain/entities/consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export function makeConsultation(
  override: Partial<consultationProps> = {},
  id?: UniqueEntityId,
) {
  const consultation = Consultation.create(
    {
      clinicianId: new UniqueEntityId(),
      patientId: new UniqueEntityId(),
      medicalRecordId: new UniqueEntityId(),
      room: faker.number.int(50),
      appointmentDate: faker.date.soon({ days: 14 }),
      ...override,
    },
    id,
  );

  return consultation;
}
