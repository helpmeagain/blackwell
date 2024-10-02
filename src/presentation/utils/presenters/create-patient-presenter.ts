import { Patient } from '@/domain/entities/patient';
import { maskPassword } from './mask-password';

export class CreatePatientPresenter {
  static toHTTP(patient: Patient, password: string) {
    return {
      id: patient.id.toString(),
      universalMedicalRecord: patient.universalMedicalRecord.id.toString(),
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
      password: maskPassword(password),
    };
  }
}
