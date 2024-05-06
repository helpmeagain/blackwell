import { Patient } from '@/domain/entities/patient';

export class patientPresenter {
  static toHTTP(patient: Patient) {
    return {
      id: patient.id.toString(),
      name: patient.name,
      surname: patient.surname,
      slug: patient.slug.value,
      gender: patient.gender,
      birthDate: patient.birthDate,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
    };
  }
}
