import { Consultation } from '@/domain/entities/consultation';

export class CreateConsultationPresenter {
  static toHTTP(consultation: Consultation) {
    return {
      id: consultation.id.toString(),
      patientId: consultation.patientId.toString(),
      clinicianId: consultation.clinicianId.toString(),
      // medicalRecordId: consultation.medicalRecordId.toString(),
      room: consultation.room,
      appointmentDate: consultation.appointmentDate,
    };
  }
}
