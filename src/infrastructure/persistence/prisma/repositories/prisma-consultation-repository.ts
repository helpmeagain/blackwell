import { PaginationParams } from '@/application/common/pagination-params';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { Consultation } from '@/domain/entities/consultation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaConsultationRepository implements ConsultationRepository {
  findById(id: string): Promise<Consultation | null> {
    throw new Error('not implemented');
  }

  findManyRecent(params: PaginationParams): Promise<Consultation[]> {
    throw new Error('not implemented');
  }

  create(consultation: Consultation): Promise<void> {
    throw new Error('not implemented');
  }

  save(consultation: Consultation): Promise<void> {
    throw new Error('not implemented');
  }

  delete(consultation: Consultation): Promise<void> {
    throw new Error('not implemented');
  }
}
