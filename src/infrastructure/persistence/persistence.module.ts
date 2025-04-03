import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClinicianRepository } from './prisma/repositories/prisma-clinician-repository';
import { PrismaConsultationRepository } from './prisma/repositories/prisma-consultation-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';
import { NotificationRepository } from '@/application/repositories/notification-repository';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { PrismaUniversalMedicalRecordRepository } from './prisma/repositories/prisma-universal-medical-record-repository';
import { NeurofunctionalRecordRepository } from '@/application/repositories/neurofunctional-record-repository';
import { PrismaNeurofunctionalRecordRepository } from './prisma/repositories/prisma-neurofunctional-record-repository';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { PrismaCardiorespiratoryRecordRepository } from './prisma/repositories/prisma-cardiorespiratory-record-repository';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { PrismaTraumaOrthopedicRecordRepository } from './prisma/repositories/prisma-trauma-orthopedic-record-repository';
import { CacheModule } from '../cache/cache.module';
import { PasswordResetRepository } from '@/application/repositories/password-reset-repository';
import { PrismaPasswordResetTokenRepository } from './prisma/repositories/prisma-password-reset-repository';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    { provide: ClinicianRepository, useClass: PrismaClinicianRepository },
    { provide: ConsultationRepository, useClass: PrismaConsultationRepository },
    { provide: NotificationRepository, useClass: PrismaNotificationRepository },
    { provide: PatientRepository, useClass: PrismaPatientRepository },
    {
      provide: UniversalMedicalRecordRepository,
      useClass: PrismaUniversalMedicalRecordRepository,
    },
    {
      provide: NeurofunctionalRecordRepository,
      useClass: PrismaNeurofunctionalRecordRepository,
    },
    {
      provide: CardiorespiratoryRecordRepository,
      useClass: PrismaCardiorespiratoryRecordRepository,
    },
    {
      provide: TraumaOrthopedicRecordRepository,
      useClass: PrismaTraumaOrthopedicRecordRepository,
    },
    {
      provide: PasswordResetRepository,
      useClass: PrismaPasswordResetTokenRepository,
    }
  ],
  exports: [
    PrismaService,
    ClinicianRepository,
    ConsultationRepository,
    NotificationRepository,
    PatientRepository,
    UniversalMedicalRecordRepository,
    NeurofunctionalRecordRepository,
    CardiorespiratoryRecordRepository,
    TraumaOrthopedicRecordRepository,
    PasswordResetRepository
  ],
})
export class PersistenceModule {}
