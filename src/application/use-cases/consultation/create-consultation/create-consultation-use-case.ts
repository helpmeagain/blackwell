import { Either, left, right } from '@application/common/error-handler/either';
import { Consultation } from '@entities/consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { type ConsultationRepository } from '@/application/repositories/consultation-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

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
  ) {}

  async execute({
    clinicianId,
    patientId,
    room,
    appointmentDate,
  }: createConsultationRequest): Promise<createConsultationResponse> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    const consultation = Consultation.create({
      clinicianId: new UniqueEntityId(clinicianId),
      patientId: new UniqueEntityId(patientId),
      room,
      appointmentDate,
    });

    patient.medicalRecord.consultationsIds.add(consultation.id);

    await this.consultationRepository.create(consultation);
    await this.patientRepository.save(patient);
    return right({ consultation });
  }
}
