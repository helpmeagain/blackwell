import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { GetConsultationByIdUseCase } from '@/application/use-cases/consultation/get-consultation-by-id/get-consultation-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestGetConsultationByIdUseCase extends GetConsultationByIdUseCase {
  constructor(repository: ConsultationRepository) {
    super(repository);
  }
}
