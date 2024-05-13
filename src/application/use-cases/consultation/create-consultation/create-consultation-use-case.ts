import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { Consultation } from '@entities/consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { type ConsultationRepository } from '@/application/repositories/consultation-repository';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { ConsultationIdList } from '@/domain/entities/consultation-list';

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

    patient.medicalRecord.consultationsIds = new ConsultationIdList([consultation.id]);

    await this.consultationRepository.create(consultation);
    return right({ consultation });
  }
}
