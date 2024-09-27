import { Clinician } from '@/domain/entities/clinician';

export class ReturnClinicianPresenter {
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
      password: '*********',
      createdAt: clinician.createdAt,
      updatedAt: clinician.updatedAt,
    };
  }
}
