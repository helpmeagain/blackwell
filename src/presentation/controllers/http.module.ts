import { Module } from '@nestjs/common';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ClinicianModule } from './clinician/clinician.module';
import { PatientModule } from './patient/patient.module';
import { ConsultationModule } from './consultation/consultation.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PersistenceModule,
    CryptographyModule,
    AuthenticateModule,
    ClinicianModule,
    ConsultationModule,
    MedicalRecordModule,
    PatientModule,
    NotificationModule,
  ],
})
export class HttpModule {}
