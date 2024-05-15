import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { CreateConsultationController } from './create-consultation.controller';
import { FetchRecentConsultationsController } from './fetch-recent-consultations.controller';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [CreateConsultationController, FetchRecentConsultationsController],
})
export class ConsultationModule {}
