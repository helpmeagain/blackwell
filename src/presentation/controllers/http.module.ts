import { Module } from '@nestjs/common';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ClinicianModule } from './clinician/clinician.module';
import { PatientModule } from './patient/patient.module';
import { ConsultationModule } from './consultation/consultation.module';

@Module({
  imports: [
    PersistenceModule,
    CryptographyModule,
    AuthenticateModule,
    ClinicianModule,
    ConsultationModule,
    PatientModule,
  ],
})
export class HttpModule {}
