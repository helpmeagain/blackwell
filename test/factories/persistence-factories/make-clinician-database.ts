import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { PrismaClinicianMapper } from '@/infrastructure/persistence/prisma/mappers/prisma-clinician-mapper';
import { Clinician, ClinicianProps } from '@/domain/entities/clinician';
import { makeClinician } from '../make-clinician';

@Injectable()
export class ClinicianFactory {
  constructor(private prisma: PrismaService) {}

  async makeDatabaseClinician(data: Partial<ClinicianProps> = {}): Promise<Clinician> {
    const clinician = makeClinician(data);

    await this.prisma.clinician.create({
      data: PrismaClinicianMapper.toPersistence(clinician),
    });

    return clinician;
  }
}
