import { Module } from '@nestjs/common';
import { NestOnConsultationCreated } from '../adapter/notification/nest-on-consultation-created';
import { PersistenceModule } from '../persistence/persistence.module';
import { NestCreateNotificationUseCase } from '../adapter/notification/nest-create-notification-use-case';

@Module({
  imports: [PersistenceModule],
  providers: [NestOnConsultationCreated, NestCreateNotificationUseCase],
})
export class EventModule {}
