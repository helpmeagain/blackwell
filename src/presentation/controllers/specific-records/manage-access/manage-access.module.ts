import { Module } from '@nestjs/common';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { GetPendingAuthorizationUsersController } from './get-pending-authorization/get-pending-authorization.controller';
import { NestGetPendingAuthorizationUsersUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-pending-authorization';
import { RevokeAccessController } from './revoke-access/revoke-access.controller';
import { NestRevokeAccessUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-revoke-access';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [GetPendingAuthorizationUsersController, RevokeAccessController],
  providers: [NestGetPendingAuthorizationUsersUseCase, NestRevokeAccessUseCase],
})
export class ManageAccessModule {}
