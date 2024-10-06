import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaNeurofunctionalRecordMapper } from '../mappers/prisma-neurofunctional-record-mapper';
import { PaginationParams } from '@/application/common/pagination-params';

@Injectable()
export class PrismaNeurofunctionalRecordRepository
  implements NeurofunctionalRecordRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<NeurofunctionalRecord | null> {
    const neurofunctionalRecord = await this.prisma.neurofunctionalRecord.findUnique({
      where: { id },
    });

    if (!neurofunctionalRecord) {
      return null;
    }

    return PrismaNeurofunctionalRecordMapper.toDomain(neurofunctionalRecord);
  }

  async findByPatientId(patientId: string): Promise<NeurofunctionalRecord | null> {
    const neurofunctionalRecord = await this.prisma.neurofunctionalRecord.findUnique({
      where: { patientId },
    });

    if (!neurofunctionalRecord) {
      return null;
    }

    return PrismaNeurofunctionalRecordMapper.toDomain(neurofunctionalRecord);
  }

  async findByUniversalRecordId(
    universalRecordId: string,
  ): Promise<NeurofunctionalRecord | null> {
    const neurofunctionalRecord = await this.prisma.neurofunctionalRecord.findUnique({
      where: { universalMedicalRecordId: universalRecordId },
    });

    if (!neurofunctionalRecord) {
      return null;
    }

    return PrismaNeurofunctionalRecordMapper.toDomain(neurofunctionalRecord);
  }

  async findManyByClinicianId(
    clinicianId: string,
    { page, orderBy }: PaginationParams,
  ): Promise<NeurofunctionalRecord[]> {
    const neurofunctionalRecord = await this.prisma.neurofunctionalRecord.findMany({
      where: { clinicianId },
      orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    });

    return neurofunctionalRecord.map(PrismaNeurofunctionalRecordMapper.toDomain);
  }

  async create(neurofunctionalRecord: NeurofunctionalRecord): Promise<void> {
    const data = PrismaNeurofunctionalRecordMapper.toPersistence(neurofunctionalRecord);
    await this.prisma.neurofunctionalRecord.create({ data });
  }

  async save(neurofunctionalRecord: NeurofunctionalRecord): Promise<void> {
    const data = PrismaNeurofunctionalRecordMapper.toPersistence(neurofunctionalRecord);
    await this.prisma.neurofunctionalRecord.update({ where: { id: data.id }, data });
  }
}
