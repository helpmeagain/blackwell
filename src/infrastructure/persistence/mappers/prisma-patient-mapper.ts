import { Gender } from '@/domain/common/types/gender-type';
import { Patient } from '@/domain/entities/patient';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Patient as PrismaPatient, Prisma } from '@prisma/client';

export class PrismaPatientMapper {
  static toDomain(raw: PrismaPatient): Patient {
    return Patient.create(
      {
        name: raw.name,
        surname: raw.surname,
        gender: raw.gender as Gender,
        phoneNumber: raw.phoneNumber,
        email: raw.email,
        password: raw.password,
        birthDate: raw.birthDate,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(patient: Patient): Prisma.PatientUncheckedCreateInput {
    return {
      id: patient.id.toString(),
      name: patient.name,
      surname: patient.surname,
      slug: patient.slug.value,
      gender: patient.gender,
      birthDate: patient.birthDate,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      password: patient.password,
    };
  }
}
