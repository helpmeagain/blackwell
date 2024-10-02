import { Patient } from '@/domain/entities/patient';

export class ReturnPatientPresenter {
  static toHTTP(patient: Patient) {
    return {
      id: patient.id.toString(),
      universalMedicalRecordId: patient.universalMedicalRecord.id.toString(),
      name: patient.name,
      surname: patient.surname,
      slug: patient.slug.value,
      gender: patient.gender,
      cpf: patient.cpf,
      birthDate: patient.birthDate,
      phoneNumber: patient.phoneNumber,
      address: patient.address,
      city: patient.city,
      state: patient.state,
      email: patient.email,
      password: '*********',
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }
}
