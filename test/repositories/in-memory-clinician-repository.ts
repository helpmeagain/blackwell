import { PaginationParams } from '@/application/common/pagination-params';
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

  async findBySlug(slug: string): Promise<Clinician[]> {
    const clinicians = this.items.filter((item) =>
      item.slug.value.toString().includes(slug),
    );

    if (!clinicians.length) {
      return [];
    }

    return clinicians;
  }

  async findMany({ page, orderBy }: PaginationParams): Promise<Clinician[]> {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;

    const sortedItems = [...this.items];
    if (orderBy) {
      sortedItems.sort((a, b) => {
        const fieldA = a[orderBy.field as keyof Clinician];
        const fieldB = b[orderBy.field as keyof Clinician];

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return orderBy.direction === 'asc'
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        }

        if (fieldA instanceof Date && fieldB instanceof Date) {
          return orderBy.direction === 'asc'
            ? fieldA.getTime() - fieldB.getTime()
            : fieldB.getTime() - fieldA.getTime();
        }

        return 0;
      });
    }

    return sortedItems.slice(startIndex, endIndex);
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
