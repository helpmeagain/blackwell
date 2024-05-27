import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClinicianRepository } from './prisma/repositories/prisma-clinician-repository';
import { PrismaConsultationRepository } from './prisma/repositories/prisma-consultation-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ConsultationRepository } from '@/application/repositories/consultation-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ClinicianRepository, useClass: PrismaClinicianRepository },
    { provide: ConsultationRepository, useClass: PrismaConsultationRepository },
    PrismaNotificationRepository,
    { provide: PatientRepository, useClass: PrismaPatientRepository },
  ],
  exports: [
    PrismaService,
    ClinicianRepository,
    ConsultationRepository,
    PrismaNotificationRepository,
    PatientRepository,
  ],
})
export class PersistenceModule {}
