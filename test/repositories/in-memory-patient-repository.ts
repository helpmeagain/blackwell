import { PatientRepository } from '@/application/repositories/patient-repository';
import { Patient } from '@/domain/entities/patient';

export class InMemoryPatientRepository implements PatientRepository {
  public items: Patient[] = [];

  async findById(id: string) {
    const patient = this.items.find((item) => item.id.toString() === id);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async findBySlug(slug: string) {
    const patient = this.items.find((item) => item.slug === slug);

    if (!patient) {
      return null;
    }

    return patient;
  }

  async create(patient: Patient) {
    this.items.push(patient);
  }

  async delete(patient: Patient) {
    const index = this.items.findIndex((item) => item.id === patient.id);
    this.items.splice(index, 1);
  }
}
