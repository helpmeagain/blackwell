import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';

export class InMemoryClinicianRepository implements ClinicianRepository {
  public items: Clinician[] = [];

  async findById(id: string) {
    const clinician = this.items.find((item) => item.id.toString() === id);

    if (!clinician) {
      return null;
    }

    return clinician;
  }

  async findByEmail(email: string) {
    const clinician = this.items.find((item) => item.email === email);

    if (!clinician) {
      return null;
    }

    return clinician;
  }

  async findBySlug(slug: string) {
    const clinician = this.items.find((item) => item.slug.value.toString() === slug);

    if (!clinician) {
      return null;
    }

    return clinician;
  }

  async create(clinician: Clinician) {
    this.items.push(clinician);
  }

  async save(clinician: Clinician) {
    const index = this.items.findIndex((item) => item.id === clinician.id);
    this.items[index] = clinician;
  }

  async delete(clinician: Clinician) {
    const index = this.items.findIndex((item) => item.id === clinician.id);
    this.items.splice(index, 1);
  }
}
