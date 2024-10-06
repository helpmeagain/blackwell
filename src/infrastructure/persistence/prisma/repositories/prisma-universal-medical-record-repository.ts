import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { PrismaUniversalMedicalRecordMapper } from '../mappers/prisma-universal-medical-record-mapper';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { PrismaConsultationMapper } from '../mappers/prisma-consultation-mapper';
import { Consultation } from '@/domain/entities/consultation';

@Injectable()
export class PrismaUniversalMedicalRecordRepository
  implements UniversalMedicalRecordRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(medicalRecordId: string): Promise<UniversalMedicalRecord | null> {
    const medicalRecord = await this.prisma.universalMedicalRecord.findUnique({
      where: { id: medicalRecordId },
      include: { NeurofunctionalRecord: { select: { id: true } } },
    });

    if (!medicalRecord) {
      return null;
    }

    return PrismaUniversalMedicalRecordMapper.toDomain(medicalRecord);
  }

  async findByPatientId(patientId: string): Promise<UniversalMedicalRecord | null> {
    const medicalRecord = await this.prisma.universalMedicalRecord.findUnique({
      where: { patientId },
      include: { NeurofunctionalRecord: { select: { id: true } } },
    });

    if (!medicalRecord) {
      return null;
    }

    return PrismaUniversalMedicalRecordMapper.toDomain(medicalRecord);
  }

  async save(medicalRecord: UniversalMedicalRecord): Promise<void | null> {
    const data = PrismaUniversalMedicalRecordMapper.toPersistence(medicalRecord);
    await this.prisma.universalMedicalRecord.update({ where: { id: data.id }, data });
  }

  async create(medicalRecord: UniversalMedicalRecord): Promise<void | null> {
    const data = PrismaUniversalMedicalRecordMapper.toPersistence(medicalRecord);
    await this.prisma.universalMedicalRecord.create({ data });
  }

  async saveConsultationOnRecord(consultation: Consultation): Promise<void | null> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    const universalMedicalRecord = await this.findById(data.universalMedicalRecordId);

    if (!universalMedicalRecord) {
      return null;
    }

    await this.prisma.universalMedicalRecord.update({
      where: { id: universalMedicalRecord.id.toString() },
      data: {
        consultationId: {
          push: data.id,
        },
      },
    });
  }

  async removeConsultationOnRecord(consultation: Consultation): Promise<void | null> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    const universalMedicalRecord = await this.findById(data.universalMedicalRecordId);

    if (!universalMedicalRecord) {
      return null;
    }

    await this.prisma.universalMedicalRecord.update({
      where: { id: universalMedicalRecord.id.toString() },
      data: {
        consultationId: {
          set: universalMedicalRecord.consultationsIds
            .getItems()
            .filter((id) => id.toString() !== data.id)
            .map((id) => id.toString()),
        },
      },
    });
  }
}
