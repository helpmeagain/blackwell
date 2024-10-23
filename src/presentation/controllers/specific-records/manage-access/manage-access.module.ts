import { Module } from '@nestjs/common';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { GetPendingAuthorizationUsersController } from './get-pending-authorization/get-pending-authorization.controller';
import { NestGetPendingAuthorizationUsersUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-pending-authorization';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [GetPendingAuthorizationUsersController],
  providers: [NestGetPendingAuthorizationUsersUseCase],
})
export class ManageAccessModule {}
