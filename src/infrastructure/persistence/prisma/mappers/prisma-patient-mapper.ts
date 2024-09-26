import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { Patient } from '@/domain/entities/patient';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Patient as PrismaPatient, Prisma } from '@prisma/client';

export class PrismaPatientMapper {
  static toDomain(raw: PrismaPatient): Patient {
    const patient = Patient.create(
      {
        name: raw.name,
        surname: raw.surname,
        gender: raw.gender,
        phoneNumber: raw.phoneNumber,
        email: raw.email,
        password: raw.password,
        birthDate: raw.birthDate,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );

    const universalMedicalRecord = UniversalMedicalRecord.create(
      { patientId: patient.id },
      raw.universalMedicalRecordId
        ? new UniqueEntityId(raw.universalMedicalRecordId)
        : undefined,
    );
    patient.universalMedicalRecord = universalMedicalRecord;

    return patient;
  }

  static toPersistence(patient: Patient): Prisma.PatientUncheckedCreateInput {
    return {
      id: patient.id.toString(),
      name: patient.name,
      surname: patient.surname,
      slug: patient.slug.value,
      gender: patient.gender,
      birthDate: patient.birthDate,
      universalMedicalRecordId: patient.universalMedicalRecord.id.toString(),
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      password: patient.password,
    };
  }
}
