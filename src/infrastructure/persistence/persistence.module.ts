import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClinicianRepository } from './prisma/repositories/prisma-clinician-repository';
import { PrismaConsultationRepository } from './prisma/repositories/prisma-consultation-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient-repository';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ClinicianRepository, useClass: PrismaClinicianRepository },
    PrismaConsultationRepository,
    PrismaNotificationRepository,
    PrismaPatientRepository,
  ],
  exports: [
    PrismaService,
    ClinicianRepository,
    PrismaConsultationRepository,
    PrismaNotificationRepository,
    PrismaPatientRepository,
  ],
})
export class PersistenceModule {}
