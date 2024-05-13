import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { PrismaPatientMapper } from '@/infrastructure/persistence/mappers/prisma-patient-mapper';
import { Patient, PatientProps } from '@/domain/entities/patient';
import { makePatient } from '../make-patient';
import { PrismaMedicalRecordMapper } from '@/infrastructure/persistence/mappers/prisma-medical-record-mapper';

@Injectable()
export class PatientFactory {
  constructor(private prisma: PrismaService) {}

  async makeDatabasePatient(data: Partial<PatientProps> = {}): Promise<Patient> {
    const patient = makePatient(data);

    await this.prisma.medicalRecord.create({
      data: PrismaMedicalRecordMapper.toPersistence(patient.medicalRecord),
    });
    await this.prisma.patient.create({
      data: PrismaPatientMapper.toPersistence(patient),
    });

    return patient;
  }
}
