import { PatientRepository } from '@/application/repositories/patient-repository';
import { MedicalRecord } from '@/domain/entities/medical-record';
import { Patient } from '@/domain/entities/patient';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaPatientMapper } from '../../mappers/prisma-patient-mapper';
import { PrismaMedicalRecordMapper } from '../../mappers/prisma-medical-record-mapper';

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

  async create(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPersistence(patient);
    await this.prisma.patient.create({ data });
  }

  async save(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPersistence(patient);
    await this.prisma.patient.update({ where: { id: data.id }, data });
  }

  async delete(patient: Patient): Promise<void> {
    const data = PrismaPatientMapper.toPersistence(patient);
    await this.prisma.patient.delete({ where: { id: data.id } });
  }

  findRecordById(medicalRecordId: string): Promise<MedicalRecord | null> {
    throw new Error('not implemented');
  }

  saveRecord(medicalRecord: MedicalRecord): Promise<void> {
    throw new Error('not implemented');
  }

  async createRecord(
    patientId: string,
    medicalRecord: MedicalRecord,
  ): Promise<void | null> {
    const patient = this.findById(patientId);

    if (!patient) {
      return null;
    }

    const data = PrismaMedicalRecordMapper.toPersistence(medicalRecord);
    await this.prisma.medicalRecord.create({ data });
  }
}
