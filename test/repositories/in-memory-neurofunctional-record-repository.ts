import { PaginationParams } from '@/application/common/pagination-params';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';

export class InMemoryNeurofunctionalRecordRepository
  implements NeurofunctionalRecordRepository
{
  public items: NeurofunctionalRecord[] = [];

  async findById(id: string) {
    const neuroFunctional = this.items.find((item) => item.id.toString() === id);

    if (!neuroFunctional) {
      return null;
    }

    return neuroFunctional;
  }

  async findByPatientId(patientId: string) {
    const neuroFunctional = this.items.find(
      (item) => item.patientId.toString() === patientId,
    );

    if (!neuroFunctional) {
      return null;
    }

    return neuroFunctional;
  }

  async findByUniversalRecordId(universalRecordId: string) {
    const neuroFunctional = this.items.find(
      (item) => item.universalMedicalRecordId.toString() === universalRecordId,
    );

    if (!neuroFunctional) {
      return null;
    }

    return neuroFunctional;
  }

  async findManyByClinicianId(clinicianId: string, { page, orderBy }: PaginationParams) {
    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;

    const sortedItems = [...this.items];
    if (orderBy) {
      sortedItems.sort((a, b) => {
        const fieldA = a[orderBy.field as keyof NeurofunctionalRecord];
        const fieldB = b[orderBy.field as keyof NeurofunctionalRecord];

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

  async create(neurofunctionalRecord: NeurofunctionalRecord) {
    this.items.push(neurofunctionalRecord);
  }

  async save(neurofunctionalRecord: NeurofunctionalRecord) {
    const index = this.items.findIndex((item) => item.id === neurofunctionalRecord.id);
    this.items[index] = neurofunctionalRecord;
  }
}
