import { PaginationParams } from '@/application/common/pagination-params';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { Consultation } from '@/domain/entities/consultation';
import { Injectable } from '@nestjs/common';
import { PrismaConsultationMapper } from '../mappers/prisma-consultation-mapper';
import { PrismaService } from '../prisma.service';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { DomainEvents } from '@/domain/common/events/domain-events';

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

  async findManyRecent({ page }: PaginationParams): Promise<Consultation[]> {
    const consultations = await this.prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    });
    return consultations.map(PrismaConsultationMapper.toDomain);
  }

  async create(consultation: Consultation): Promise<void> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    await this.patientRepository.saveConsultationOnRecord(consultation);
    await this.prisma.consultation.create({ data });
    DomainEvents.dispatchEventsForAggregate(consultation.id);
  }

  async save(consultation: Consultation): Promise<void> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    await this.prisma.consultation.update({ where: { id: data.id }, data });
    DomainEvents.dispatchEventsForAggregate(consultation.id);
  }

  async delete(consultation: Consultation): Promise<void> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    await this.patientRepository.removeConsultationOnRecord(consultation);
    await this.prisma.consultation.delete({ where: { id: data.id } });
  }
}
