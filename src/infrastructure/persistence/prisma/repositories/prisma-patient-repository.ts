import { PatientRepository } from '@/application/repositories/patient-repository';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { Patient } from '@/domain/entities/patient';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaPatientMapper } from '../mappers/prisma-patient-mapper';
import { PrismaUniversalMedicalRecordMapper } from '../mappers/prisma-universal-medical-record-mapper';
import { Consultation } from '@/domain/entities/consultation';
import { PrismaConsultationMapper } from '../mappers/prisma-consultation-mapper';
import { PaginationParams } from '@/application/common/pagination-params';

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

  async findMany({ page, orderBy }: PaginationParams): Promise<Patient[]> {
    const patient = await this.prisma.patient.findMany({
      orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    });

    return patient.map(PrismaPatientMapper.toDomain);
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

  async findRecordById(medicalRecordId: string): Promise<UniversalMedicalRecord | null> {
    const medicalRecord = await this.prisma.universalMedicalRecord.findUnique({
      where: { id: medicalRecordId },
    });

    if (!medicalRecord) {
      return null;
    }

    return PrismaUniversalMedicalRecordMapper.toDomain(medicalRecord);
  }

  async findRecordByPatientId(patientId: string): Promise<UniversalMedicalRecord | null> {
    const medicalRecord = await this.prisma.universalMedicalRecord.findUnique({
      where: { patientId },
    });

    if (!medicalRecord) {
      return null;
    }

    return PrismaUniversalMedicalRecordMapper.toDomain(medicalRecord);
  }

  async saveRecord(medicalRecord: UniversalMedicalRecord): Promise<void | null> {
    const data = PrismaUniversalMedicalRecordMapper.toPersistence(medicalRecord);
    await this.prisma.universalMedicalRecord.update({ where: { id: data.id }, data });
  }

  async createRecord(
    patientId: string,
    medicalRecord: UniversalMedicalRecord,
  ): Promise<void | null> {
    const patient = this.findById(patientId);

    if (!patient) {
      return null;
    }
    const data = PrismaUniversalMedicalRecordMapper.toPersistence(medicalRecord);
    await this.prisma.universalMedicalRecord.create({ data });
  }

  async saveConsultationOnRecord(consultation: Consultation): Promise<void | null> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    const patient = await this.findById(data.patientId);

    if (!patient || !patient.universalMedicalRecord) {
      return null;
    }

    await this.prisma.universalMedicalRecord.update({
      where: { id: patient.universalMedicalRecord.id.toString() },
      data: {
        consultationId: {
          push: data.id,
        },
      },
    });
  }

  async removeConsultationOnRecord(consultation: Consultation): Promise<void | null> {
    const data = PrismaConsultationMapper.toPersistence(consultation);
    const medicalRecord = await this.findRecordById(data.universalMedicalRecordId);

    if (!medicalRecord) {
      return null;
    }

    await this.prisma.universalMedicalRecord.update({
      where: { id: medicalRecord.id.toString() },
      data: {
        consultationId: {
          set: medicalRecord.consultationsIds
            .getItems()
            .filter((id) => id.toString() !== data.id)
            .map((id) => id.toString()),
        },
      },
    });
  }
}
