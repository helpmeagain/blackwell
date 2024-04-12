import { faker } from '@faker-js/faker';
import {
  ClinicalConsultation,
  clinicalConsultationProps,
} from '@entities/clinical-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export function makeConsultation(
  override: Partial<clinicalConsultationProps> = {},
  id?: UniqueEntityId,
) {
  const consultation = ClinicalConsultation.create(
    {
      clinicianId: new UniqueEntityId(),
      patientId: new UniqueEntityId(),
      room: faker.number.int(50),
      appointmentDate: faker.date.soon({ days: 14 }),
      ...override,
    },
    id,
  );

  return consultation;
}
