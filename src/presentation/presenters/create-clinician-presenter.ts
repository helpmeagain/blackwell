import { Clinician } from '@/domain/entities/clinician';
import { maskPassword } from './mask-password';

export class CreateClinicianPresenter {
  static toHTTP(clinician: Clinician, password: string) {
    return {
      id: clinician.id.toString(),
      name: clinician.name,
      surname: clinician.surname,
      slug: clinician.slug.value,
      gender: clinician.gender,
      occupation: clinician.occupation,
      phoneNumber: clinician.phoneNumber,
      email: clinician.email,
      password: maskPassword(password),
    };
  }
}
