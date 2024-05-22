import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { FetchRecentConsultationUseCase } from '@/application/use-cases/consultation/fetch-recent-consultations/fetch-recent-consultations-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestFetchRecentConsultationUseCase extends FetchRecentConsultationUseCase {
  constructor(repository: ConsultationRepository) {
    super(repository);
  }
}
