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

  async create(neurofunctionalRecord: NeurofunctionalRecord) {
    this.items.push(neurofunctionalRecord);
  }

  async save(neurofunctionalRecord: NeurofunctionalRecord) {
    const index = this.items.findIndex((item) => item.id === neurofunctionalRecord.id);
    this.items[index] = neurofunctionalRecord;
  }
}
