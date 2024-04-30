import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaClinicianMapper } from '../../mappers/prisma-clinician-mapper';

@Injectable()
export class PrismaClinicianRepository implements ClinicianRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Clinician | null> {
    const clinician = await this.prisma.clinician.findUnique({
      where: { id },
    });

    if (!clinician) {
      return null;
    }

    return PrismaClinicianMapper.toDomain(clinician);
  }

  create(clinician: Clinician): Promise<void> {
    throw new Error('not implemented');
  }

  save(clinician: Clinician): Promise<void> {
    throw new Error('not implemented');
  }

  delete(consultation: Clinician): Promise<void> {
    throw new Error('not implemented');
  }
}
