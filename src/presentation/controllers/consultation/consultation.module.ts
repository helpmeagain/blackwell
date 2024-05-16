import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { CreateConsultationController } from './create-consultation/create-consultation.controller';
import { NestCreateConsultationUseCase } from '@/infrastructure/adapter/consultation/nest-create-consultation-use-case';
import { DeleteConsultationController } from './delete-consultation/delete-consultation.controller';
import { NestDeleteConsultationByIdUseCase } from '@/infrastructure/adapter/consultation/nest-delete-consultation-use-case';
import { NestGetConsultationByIdUseCase } from '@/infrastructure/adapter/consultation/nest-get-consultation-by-id-use-case';
import { GetByIdConsultationsController } from './get-consultation-by-id/get-consultation-by-id.controller';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    CreateConsultationController,
    DeleteConsultationController,
    GetByIdConsultationsController,
  ],
  providers: [
    NestCreateConsultationUseCase,
    NestDeleteConsultationByIdUseCase,
    NestGetConsultationByIdUseCase,
  ],
})
export class ConsultationModule {}
