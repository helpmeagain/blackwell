import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { CreateConsultationController } from './create-consultation/create-consultation.controller';
import { NestCreateConsultationUseCase } from '@/infrastructure/adapter/consultation/nest-create-consultation-use-case';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [CreateConsultationController],
  providers: [NestCreateConsultationUseCase],
})
export class ConsultationModule {}
