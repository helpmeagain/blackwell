import { PatientRepository } from '@/application/repositories/patient-repository';
import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@/domain/entities/patient';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  findBySlug(slug: string): Promise<Patient | null> {
    throw new Error('not implemented');
  }

  findById(id: string): Promise<Patient | null> {
    throw new Error('not implemented');
  }

  findMedicalRecordById(medicalRecordId: string): Promise<MedicalRecord | null> {
    throw new Error('not implemented');
  }

  create(patient: Patient): Promise<void> {
    throw new Error('not implemented');
  }

  save(patient: Patient): Promise<void> {
    throw new Error('not implemented');
  }

  saveMedicalRecord(medicalRecord: MedicalRecord): Promise<void> {
    throw new Error('not implemented');
  }

  delete(patient: Patient): Promise<void> {
    throw new Error('not implemented');
  }
}
