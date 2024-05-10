import { Patient } from '@/domain/entities/patient';

export class ReturnPatientPresenter {
  static toHTTP(patient: Patient) {
    return {
      id: patient.id.toString(),
      medicalRecordId: patient.medicalRecord.id.toString(),
      name: patient.name,
      surname: patient.surname,
      slug: patient.slug.value,
      gender: patient.gender,
      birthDate: patient.birthDate,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      password: '*********',
    };
  }
}
