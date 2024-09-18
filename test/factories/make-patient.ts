import { fakerPT_BR as faker } from '@faker-js/faker';
import { Patient, PatientProps } from '@entities/patient';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { MedicalRecord } from '@/domain/entities/medical-record';

export function makePatient(override: Partial<PatientProps> = {}, id?: UniqueEntityId) {
  const mockGender = faker.person.sexType();
  const mockName = faker.person.firstName(mockGender);
  const mockSurName = faker.person.lastName(mockGender);

  const patient = Patient.create(
    {
      name: mockName,
      surname: mockSurName,
      gender: mockGender,
      birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      phoneNumber: faker.phone.number(),
      email: faker.internet
        .email({ firstName: mockName, lastName: mockSurName })
        .toLowerCase(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  const medicalRecord = MedicalRecord.create({ patientId: patient.id });
  patient.medicalRecord = medicalRecord;

  return patient;
}
