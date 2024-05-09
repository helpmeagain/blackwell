import { PatientRepository } from '@/application/repositories/patient-repository';
import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@/domain/entities/patient';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaPatientMapper } from '../../mappers/prisma-patient-mapper';

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findUnique({
      where: { email },
    });

    if (!patient) {
      return null;
    }

    return PrismaPatientMapper.toDomain(patient);
  }

  async findBySlug(slug: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findUnique({
      where: { slug },
    });

    if (!patient) {
      return null;
    }

    return PrismaPatientMapper.toDomain(patient);
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return null;
    }

    return PrismaPatientMapper.toDomain(patient);
  }

  findMedicalRecordById(medicalRecordId: string): Promise<MedicalRecord | null> {
    throw new Error('not implemented');
  }

  async create(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPersistence(patient);
    await this.prisma.patient.create({ data });
  }

  save(patient: Patient): Promise<void> {
    throw new Error('not implemented');
  }

  saveMedicalRecord(medicalRecord: MedicalRecord): Promise<void> {
    throw new Error('not implemented');
  }

  async delete(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPersistence(patient);
    await this.prisma.patient.delete({ where: { id: data.id } });
  }
}
