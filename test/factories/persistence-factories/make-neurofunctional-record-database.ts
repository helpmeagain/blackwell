import {
  NeurofunctionalRecord,
  NeurofunctionalRecordProps,
} from '@/domain/entities/specific-records/neurofunctional-record';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { makeNeurofunctionalRecord } from '../make-neurofunctional-record';
import { PrismaNeurofunctionalRecordMapper } from '@/infrastructure/persistence/prisma/mappers/prisma-neurofunctional-record-mapper';

@Injectable()
export class NeurofunctionalFactory {
  constructor(private prisma: PrismaService) {}

  async makeDatabaseRecord(
    data: Partial<NeurofunctionalRecordProps> = {},
  ): Promise<NeurofunctionalRecord> {
    const record = makeNeurofunctionalRecord(data);

    await this.prisma.neurofunctionalRecord.create({
      data: PrismaNeurofunctionalRecordMapper.toPersistence(record),
    });

    return record;
  }
}
