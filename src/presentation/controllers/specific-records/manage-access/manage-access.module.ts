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
import { RequestAccessController } from './request-access/request-access.controller';
import { NestRequestAccessUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-request-access';
import { GetAuthorizedUsersController } from './get-authorized-users/get-authorized-users.controller';
import { NestGetAuthorizedUsersUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-authorized-users';
import { GetRecordsSharedWithMeController } from './get-records-shared-with-me/get-records-shared-with-me.controller';
import { NestGetRecordsSharedWithMeUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-records-shared-with-me';
import { RequestAccessByPatientIdController } from './request-access-by-patient-id/request-access.controller';
import { NestRequestAccessUseCaseByPatientId } from '@/infrastructure/adapter/specific-records/manage-access/nest-request-access-by-patient-id';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    GetPendingAuthorizationUsersController,
    GetAuthorizedUsersController,
    GetRecordsSharedWithMeController,
    RevokeAccessController,
    AuthorizeAccessController,
    DenyPendingAuthorizationController,
    RequestAccessController,
    RequestAccessByPatientIdController,
  ],
  providers: [
    NestGetPendingAuthorizationUsersUseCase,
    NestGetAuthorizedUsersUseCase,
    NestGetRecordsSharedWithMeUseCase,
    NestRevokeAccessUseCase,
    NestAuthorizeAccessUseCase,
    NestDenyPendingAuthorizationUseCase,
    NestRequestAccessUseCase,
    NestRequestAccessUseCaseByPatientId,
  ],
})
export class ManageAccessModule {}
