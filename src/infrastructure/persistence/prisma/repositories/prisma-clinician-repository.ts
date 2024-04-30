import { ClinicianRepository } from '@/application/repositories/clinician-repository';
import { Clinician } from '@/domain/entities/clinician';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaClinicianRepository implements ClinicianRepository {
  findById(id: string): Promise<Clinician | null> {
    throw new Error('not implemented');
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
