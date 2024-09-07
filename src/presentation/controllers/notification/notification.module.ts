import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { ReadNotificationController } from './read-notification.controller';
import { NestReadNotificationUseCase } from '@/infrastructure/adapter/notification/nest-read-notification-use-case';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [ReadNotificationController],
  providers: [NestReadNotificationUseCase],
})
export class NotificationModule {}
