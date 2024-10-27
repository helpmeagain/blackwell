import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaTraumaOrthopedicRecordMapper } from '../mappers/prisma-trauma-orthopedic-record-mapper';
import { PaginationParams } from '@/application/common/pagination-params';

@Injectable()
export class PrismaTraumaOrthopedicRecordRepository
  implements TraumaOrthopedicRecordRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<TraumaOrthopedicRecord | null> {
    const traumaorthopedicRecord = await this.prisma.traumaOrthopedicRecord.findUnique({
      where: { id },
    });

    if (!traumaorthopedicRecord) {
      return null;
    }

    return PrismaTraumaOrthopedicRecordMapper.toDomain(traumaorthopedicRecord);
  }

  async findByPatientId(patientId: string): Promise<TraumaOrthopedicRecord | null> {
    const traumaorthopedicRecord = await this.prisma.traumaOrthopedicRecord.findUnique({
      where: { patientId },
    });

    if (!traumaorthopedicRecord) {
      return null;
    }

    return PrismaTraumaOrthopedicRecordMapper.toDomain(traumaorthopedicRecord);
  }

  async findByUniversalRecordId(
    universalRecordId: string,
  ): Promise<TraumaOrthopedicRecord | null> {
    const traumaorthopedicRecord = await this.prisma.traumaOrthopedicRecord.findUnique({
      where: { universalMedicalRecordId: universalRecordId },
    });

    if (!traumaorthopedicRecord) {
      return null;
    }

    return PrismaTraumaOrthopedicRecordMapper.toDomain(traumaorthopedicRecord);
  }

  async findManyByClinicianId(
    clinicianId: string,
    { page, orderBy }: PaginationParams,
  ): Promise<TraumaOrthopedicRecord[]> {
    const traumaorthopedicRecord = await this.prisma.traumaOrthopedicRecord.findMany({
      where: { clinicianId },
      orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    });

    return traumaorthopedicRecord.map(PrismaTraumaOrthopedicRecordMapper.toDomain);
  }

  async askForAuthorization(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaTraumaOrthopedicRecordMapper.toPersistence(traumaorthopedicRecord);

    await this.prisma.traumaOrthopedicRecord.update({
      where: { id: data.id },
      data: {
        pendingAuthorizationUsers: {
          push: userId,
        },
      },
    });
  }

  async removePendingAuthorization(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaTraumaOrthopedicRecordMapper.toPersistence(traumaorthopedicRecord);

    const updatedPendingAuthorizationUsers = Array.isArray(data.pendingAuthorizationUsers)
      ? data.pendingAuthorizationUsers.filter((id) => id !== userId)
      : [];

    await this.prisma.traumaOrthopedicRecord.update({
      where: { id: data.id },
      data: {
        pendingAuthorizationUsers: {
          set: updatedPendingAuthorizationUsers,
        },
      },
    });
  }

  async removeAccess(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaTraumaOrthopedicRecordMapper.toPersistence(traumaorthopedicRecord);
    const updatedAuthorizedUsers = Array.isArray(data.authorizedUsers)
      ? data.authorizedUsers.filter((id) => id !== userId)
      : [];

    await this.prisma.traumaOrthopedicRecord.update({
      where: { id: data.id },
      data: {
        authorizedUsers: {
          set: updatedAuthorizedUsers,
        },
      },
    });
  }

  async authorizeAccess(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaTraumaOrthopedicRecordMapper.toPersistence(traumaorthopedicRecord);

    const updatedPendingAuthorizationUsers = Array.isArray(data.pendingAuthorizationUsers)
      ? data.pendingAuthorizationUsers.filter((id) => id !== userId)
      : [];

    await this.prisma.traumaOrthopedicRecord.update({
      where: { id: data.id },
      data: {
        pendingAuthorizationUsers: {
          set: updatedPendingAuthorizationUsers,
        },
        authorizedUsers: {
          push: userId,
        },
      },
    });
  }

  async create(traumaorthopedicRecord: TraumaOrthopedicRecord): Promise<void> {
    const data = PrismaTraumaOrthopedicRecordMapper.toPersistence(traumaorthopedicRecord);
    await this.prisma.traumaOrthopedicRecord.create({ data });
  }

  async save(traumaorthopedicRecord: TraumaOrthopedicRecord): Promise<void> {
    const data = PrismaTraumaOrthopedicRecordMapper.toPersistence(traumaorthopedicRecord);
    await this.prisma.traumaOrthopedicRecord.update({ where: { id: data.id }, data });
  }
}
