import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';

export class InMemoryNeurofunctionalRecordRepository
  implements NeurofunctionalRecordRepository
{
  public items: NeurofunctionalRecord[] = [];

  async create(neurofunctionalRecord: NeurofunctionalRecord) {
    this.items.push(neurofunctionalRecord);
  }
}
