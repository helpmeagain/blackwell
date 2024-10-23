import { Module } from '@nestjs/common';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ClinicianModule } from './clinician/clinician.module';
import { PatientModule } from './patient/patient.module';
import { ConsultationModule } from './consultation/consultation.module';
import { UniversalMedicalRecordModule } from './universal-medical-record/universal-medical-record.module';
import { NotificationModule } from './notification/notification.module';
import { IndexModule } from './index/index.module';
import { NeurofunctionalRecordModule } from './specific-records/neurofunctional-record/neurofunctional-record.module';
import { ManageAccessModule } from './specific-records/manage-access/manage-access.module';

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
    NeurofunctionalRecordModule,
    ManageAccessModule,
    IndexModule,
  ],
})
export class HttpModule {}
