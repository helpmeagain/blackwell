import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaCardiorespiratoryRecordMapper } from '../mappers/prisma-cardiorespiratory-record-mapper';
import { PaginationParams } from '@/application/common/pagination-params';

@Injectable()
export class PrismaCardiorespiratoryRecordRepository
  implements CardiorespiratoryRecordRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<CardiorespiratoryRecord | null> {
    const cardiorespiratoryRecord = await this.prisma.cardiorespiratoryRecord.findUnique({
      where: { id },
    });

    if (!cardiorespiratoryRecord) {
      return null;
    }

    return PrismaCardiorespiratoryRecordMapper.toDomain(cardiorespiratoryRecord);
  }

  async findByPatientId(patientId: string): Promise<CardiorespiratoryRecord | null> {
    const cardiorespiratoryRecord = await this.prisma.cardiorespiratoryRecord.findUnique({
      where: { patientId },
    });

    if (!cardiorespiratoryRecord) {
      return null;
    }

    return PrismaCardiorespiratoryRecordMapper.toDomain(cardiorespiratoryRecord);
  }

  async findManyByClinicianId(
    clinicianId: string,
    { page, orderBy }: PaginationParams,
  ): Promise<CardiorespiratoryRecord[]> {
    const cardiorespiratoryRecord = await this.prisma.cardiorespiratoryRecord.findMany({
      where: { clinicianId },
      orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    });

    return cardiorespiratoryRecord.map(PrismaCardiorespiratoryRecordMapper.toDomain);
  }

  async askForAuthorization(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaCardiorespiratoryRecordMapper.toPersistence(cardiorespiratoryRecord);

    await this.prisma.cardiorespiratoryRecord.update({
      where: { id: data.id },
      data: {
        pendingAuthorizationUsers: {
          push: userId,
        },
      },
    });
  }
  
  async authorizeAccess(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaCardiorespiratoryRecordMapper.toPersistence(cardiorespiratoryRecord);

    const updatedPendingAuthorizationUsers = Array.isArray(data.pendingAuthorizationUsers)
      ? data.pendingAuthorizationUsers.filter((id) => id !== userId)
      : [];

    await this.prisma.cardiorespiratoryRecord.update({
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

  async removePendingAuthorization(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaCardiorespiratoryRecordMapper.toPersistence(cardiorespiratoryRecord);

    const updatedPendingAuthorizationUsers = Array.isArray(data.pendingAuthorizationUsers)
      ? data.pendingAuthorizationUsers.filter((id) => id !== userId)
      : [];

    await this.prisma.cardiorespiratoryRecord.update({
      where: { id: data.id },
      data: {
        pendingAuthorizationUsers: {
          set: updatedPendingAuthorizationUsers,
        },
      },
    });
  }

  async removeAccess(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
    userId: string,
  ): Promise<void> {
    const data = PrismaCardiorespiratoryRecordMapper.toPersistence(cardiorespiratoryRecord);
    const updatedAuthorizedUsers = Array.isArray(data.authorizedUsers)
      ? data.authorizedUsers.filter((id) => id !== userId)
      : [];

    await this.prisma.cardiorespiratoryRecord.update({
      where: { id: data.id },
      data: {
        authorizedUsers: {
          set: updatedAuthorizedUsers,
        },
      },
    });
  }

  async create(cardiorespiratoryRecord: CardiorespiratoryRecord): Promise<void> {
    const data = PrismaCardiorespiratoryRecordMapper.toPersistence(cardiorespiratoryRecord);
    await this.prisma.cardiorespiratoryRecord.create({ data });
  }

  async save(cardiorespiratoryRecord: CardiorespiratoryRecord): Promise<void> {
    const data = PrismaCardiorespiratoryRecordMapper.toPersistence(cardiorespiratoryRecord);
    await this.prisma.cardiorespiratoryRecord.update({ where: { id: data.id }, data });
  }
}