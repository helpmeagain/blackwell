import { MedicalRecordRepository } from '@/application/repositories/medical-record-repository';
import { MedicalRecord } from '@entities/medical-record';

export class InMemoryMedicalRecordRepository implements MedicalRecordRepository {
  public items: MedicalRecord[] = [];

  async findById(id: string) {
    const medicalrecord = this.items.find((item) => item.id.toString() === id);

    if (!medicalrecord) {
      return null;
    }

    return medicalrecord;
  }

  async create(medicalrecord: MedicalRecord) {
    this.items.push(medicalrecord);
  }

  async save(medicalrecord: MedicalRecord) {
    const index = this.items.findIndex((item) => item.id === medicalrecord.id);
    this.items[index] = medicalrecord;
  }

  async delete(medicalrecord: MedicalRecord) {
    const index = this.items.findIndex((item) => item.id === medicalrecord.id);
    this.items.splice(index, 1);
  }
}
