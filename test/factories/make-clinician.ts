import { fakerPT_BR as faker } from '@faker-js/faker';
import { Clinician, ClinicianProps } from '@entities/clinician';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export function makeClinician(
  override: Partial<ClinicianProps> = {},
  id?: UniqueEntityId,
) {
  const mockGender = faker.person.sexType();
  const mockName = faker.person.firstName(mockGender);
  const mockSurName = faker.person.lastName(mockGender);

  const clinician = Clinician.create(
    {
      name: mockName,
      surname: mockSurName,
      gender: mockGender,
      occupation: faker.person.jobTitle(),
      phoneNumber: faker.phone.number(),
      email: faker.internet
        .email({ firstName: mockName, lastName: mockSurName })
        .toLowerCase(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return clinician;
}
