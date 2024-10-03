import { fakerPT_BR as faker } from '@faker-js/faker';
import {
  NeurofunctionalRecord,
  NeurofunctionalRecordProps,
} from '@/domain/entities/specific-records/neurofunctional-record';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export function makeNeurofunctionalRecord(
  override: Partial<NeurofunctionalRecordProps> = {},
  id?: UniqueEntityId,
) {
  const consultation = NeurofunctionalRecord.create(
    {
      clinicianId: new UniqueEntityId(),
      patientId: new UniqueEntityId(),
      universalMedicalRecordId: new UniqueEntityId(),
      medicalDiagnosis: faker.lorem.sentence(),
      anamnesis: faker.lorem.sentence(),
      physicalExamination: faker.lorem.sentence(),
      physiotherapyDepartment: 'Neurofunctional',
      triage: faker.helpers.arrayElement(['blue', 'green', 'yellow', 'orange']),
      specialNeurofunctionalTests1: faker.lorem.sentence(),
      specialNeurofunctionalTests2: faker.lorem.sentence(),
      ...override,
    },
    id,
  );

  return consultation;
}
