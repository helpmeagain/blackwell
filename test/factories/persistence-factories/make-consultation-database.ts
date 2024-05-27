import { Consultation, consultationProps } from '@/domain/entities/consultation';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { makeConsultation } from '../make-consultation';
import { PrismaConsultationMapper } from '@/infrastructure/persistence/prisma/mappers/prisma-consultation-mapper';

@Injectable()
export class ConsultationFactory {
  constructor(private prisma: PrismaService) {}

  async makeDatabaseConsultation(
    data: Partial<consultationProps> = {},
  ): Promise<Consultation> {
    const consultation = makeConsultation(data);

    await this.prisma.consultation.create({
      data: PrismaConsultationMapper.toPersistence(consultation),
    });

    return consultation;
  }
}
