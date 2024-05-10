import { Gender } from '@/domain/common/types/gender-type';
import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@/domain/entities/patient';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Patient as PrismaPatient, Prisma } from '@prisma/client';

export class PrismaPatientMapper {
  static toDomain(raw: PrismaPatient): Patient {
    if (!raw.medicalRecordId) {
      throw new Error('Medical record is required');
    }

    const patient = Patient.create(
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

    const medicalRecord = MedicalRecord.create(
      { patientId: patient.id },
      new UniqueEntityId(raw.medicalRecordId),
    );
    patient.medicalRecord = medicalRecord;

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
      medicalRecordId: patient.medicalRecord.id.toString(),
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      password: patient.password,
    };
  }
}
