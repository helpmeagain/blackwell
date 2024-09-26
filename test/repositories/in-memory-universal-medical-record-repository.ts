import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { Consultation } from '@/domain/entities/consultation';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';

export class InMemoryUniversalMedicalRecordRepository
  implements UniversalMedicalRecordRepository
{
  public items: UniversalMedicalRecord[] = [];

  async findById(id: string) {
    const universalMedicalRecord = this.items.find((item) => item.id.toString() === id);

    if (!universalMedicalRecord) {
      return null;
    }

    return universalMedicalRecord;
  }

  async findByPatientId(id: string) {
    const universalMedicalRecord = this.items.find(
      (item) => item.patientId.toString() === id,
    );

    if (!universalMedicalRecord) {
      return null;
    }

    return universalMedicalRecord;
  }

  async create(universalMedicalRecord: UniversalMedicalRecord) {
    this.items.push(universalMedicalRecord);
  }

  async save(medicalRecord: UniversalMedicalRecord) {
    const index = this.items.findIndex((item) => item.id === medicalRecord.id);
    this.items[index] = medicalRecord;
  }

  async saveConsultationOnRecord(consultation: Consultation) {
    const universalMedicalRecord = this.items.find(
      (item) => item.id === consultation.universalMedicalRecordId,
    );

    if (!universalMedicalRecord) {
      return null;
    }

    universalMedicalRecord.consultationsIds.add(consultation.id);
  }

  async removeConsultationOnRecord(consultation: Consultation) {
    const universalMedicalRecord = this.items.find(
      (item) => item.id === consultation.universalMedicalRecordId,
    );

    if (!universalMedicalRecord) {
      return null;
    }

    universalMedicalRecord.consultationsIds.remove(consultation.id);
  }
}
