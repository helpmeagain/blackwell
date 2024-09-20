import { Module } from '@nestjs/common';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ClinicianModule } from './clinician/clinician.module';
import { PatientModule } from './patient/patient.module';
import { ConsultationModule } from './consultation/consultation.module';
import { UniversalMedicalRecordModule } from './universal-medical-record/universal-medical-record.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PersistenceModule,
    CryptographyModule,
    AuthenticateModule,
    ClinicianModule,
    ConsultationModule,
    UniversalMedicalRecordModule,
    PatientModule,
    NotificationModule,
  ],
})
export class HttpModule {}
