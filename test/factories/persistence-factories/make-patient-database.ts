import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { PrismaPatientMapper } from '@/infrastructure/persistence/prisma/mappers/prisma-patient-mapper';
import { Patient, PatientProps } from '@/domain/entities/patient';
import { makePatient } from '../make-patient';
import { PrismaUniversalMedicalRecordMapper } from '@/infrastructure/persistence/prisma/mappers/prisma-universal-medical-record-mapper';

@Injectable()
export class PatientFactory {
  constructor(private prisma: PrismaService) {}

  async makeDatabasePatient(data: Partial<PatientProps> = {}): Promise<Patient> {
    const patient = makePatient(data);

    await this.prisma.universalMedicalRecord.create({
      data: PrismaUniversalMedicalRecordMapper.toPersistence(patient.universalMedicalRecord),
    });
    await this.prisma.patient.create({
      data: PrismaPatientMapper.toPersistence(patient),
    });

    return patient;
  }
}
