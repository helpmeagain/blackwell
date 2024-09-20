import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { Consultation } from '@entities/consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { type ConsultationRepository } from '@/application/repositories/consultation-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ConsultationIdList } from '@/domain/entities/consultation-list';
import { ClinicianRepository } from '@/application/repositories/clinician-repository';

interface createConsultationRequest {
  clinicianId: string;
  patientId: string;
  room: number;
  appointmentDate: Date;
}

type createConsultationResponse = Either<
  ResourceNotFound,
  { consultation: Consultation }
>;

export class CreateConsultationUseCase {
  constructor(
    private readonly consultationRepository: ConsultationRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
  ) {}

  async execute(req: createConsultationRequest): Promise<createConsultationResponse> {
    const { clinicianId, patientId, room, appointmentDate } = req;
    const [patient, clinician] = await Promise.all([
      this.patientRepository.findById(patientId),
      this.clinicianRepository.findById(clinicianId),
    ]);

    if (!patient) {
      return left(new ResourceNotFound('Patient'));
    }

    if (!clinician) {
      return left(new ResourceNotFound('Clinician'));
    }

    const consultation = Consultation.create({
      clinicianId: new UniqueEntityId(clinicianId),
      patientId: new UniqueEntityId(patientId),
      universalMedicalRecordId: new UniqueEntityId(
        patient.universalMedicalRecord.id.toString(),
      ),
      room,
      appointmentDate,
    });

    patient.universalMedicalRecord.consultationsIds = new ConsultationIdList([
      consultation.id,
    ]);

    await this.consultationRepository.create(consultation);
    return right({ consultation });
  }
}
