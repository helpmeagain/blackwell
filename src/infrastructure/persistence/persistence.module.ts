import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClinicianRepository } from './prisma/repositories/prisma-clinician-repository';
import { PrismaConsultationRepository } from './prisma/repositories/prisma-consultation-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient-repository';

@Module({
  providers: [
    PrismaService,
    PrismaClinicianRepository,
    PrismaConsultationRepository,
    PrismaNotificationRepository,
    PrismaPatientRepository,
  ],
  exports: [
    PrismaService,
    PrismaClinicianRepository,
    PrismaConsultationRepository,
    PrismaNotificationRepository,
    PrismaPatientRepository,
  ],
})
export class PersistenceModule {}
