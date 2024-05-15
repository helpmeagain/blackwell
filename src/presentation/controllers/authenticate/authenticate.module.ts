import { Module } from '@nestjs/common';
import { AuthenticateClinicianController } from './clinician/authenticate-clinician.controller';
import { AuthenticatePatientController } from './patient/authenticate-patient.controller';
import { NestAuthenticateClinicianUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-clinician-use-case';
import { NestAuthenticatePatientUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-patient-use-case';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [AuthenticateClinicianController, AuthenticatePatientController],
  providers: [NestAuthenticateClinicianUseCase, NestAuthenticatePatientUseCase],
})
export class AuthenticateModule {}
