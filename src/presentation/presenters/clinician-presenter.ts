import { Clinician } from '@/domain/entities/clinician';

export class clinicianPresenter {
  static toHTTP(clinician: Clinician) {
    return {
      id: clinician.id.toString(),
      name: clinician.name,
      surname: clinician.surname,
      slug: clinician.slug.value,
      gender: clinician.gender,
      occupation: clinician.occupation,
      phoneNumber: clinician.phoneNumber,
      email: clinician.email,
    };
  }
}
