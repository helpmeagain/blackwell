import { PaginationParams } from '@/application/common/pagination-params';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { Consultation } from '@/domain/entities/consultation';
import { Injectable } from '@nestjs/common';
import { PrismaConsultationMapper } from '../mappers/prisma-consultation-mapper';
import { PrismaService } from '../prisma.service';
import { PatientRepository } from '@/application/repositories/patient-repository';

@Injectable()
export class PrismaConsultationRepository implements ConsultationRepository {
  constructor(
    private prisma: PrismaService,
    private patientRepository: PatientRepository,
  ) {}

  async findById(id: string): Promise<Consultation | null> {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      return null;
    }

    return PrismaConsultationMapper.toDomain(consultation);
  }

  findManyRecent(params: PaginationParams): Promise<Consultation[]> {
    throw new Error('not implemented');
  }

  async create(consultation: Consultation): Promise<void> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    await this.patientRepository.saveConsultationOnRecord(consultation);
    await this.prisma.consultation.create({ data });
  }

  async save(consultation: Consultation): Promise<void> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    await this.prisma.consultation.update({ where: { id: data.id }, data });
  }

  async delete(consultation: Consultation): Promise<void> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    await this.patientRepository.removeConsultationOnRecord(consultation);
    await this.prisma.consultation.delete({ where: { id: data.id } });
  }
}
