import { Module } from '@nestjs/common';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { GetPendingAuthorizationUsersController } from './get-pending-authorization/get-pending-authorization.controller';
import { NestGetPendingAuthorizationUsersUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-pending-authorization';
import { RevokeAccessController } from './revoke-access/revoke-access.controller';
import { NestRevokeAccessUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-revoke-access';
import { AuthorizeAccessController } from './authorize-access/authorize-access.controller';
import { NestAuthorizeAccessUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-authorize-access';
import { DenyPendingAuthorizationController } from './deny-pending-authorization/deny-pending-authorization.controller';
import { NestDenyPendingAuthorizationUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-deny-pending-authorization';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    GetPendingAuthorizationUsersController,
    RevokeAccessController,
    AuthorizeAccessController,
    DenyPendingAuthorizationController,
  ],
  providers: [
    NestGetPendingAuthorizationUsersUseCase,
    NestRevokeAccessUseCase,
    NestAuthorizeAccessUseCase,
    NestDenyPendingAuthorizationUseCase,
  ],
})
export class ManageAccessModule {}
