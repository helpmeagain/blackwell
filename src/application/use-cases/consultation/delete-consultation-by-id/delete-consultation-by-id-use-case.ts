import { Either, left, right } from '@error/either';
import { NotAllowed } from '@error/errors/not-allowed';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';

interface deleteConsultationByIdRequest {
  consultationId: string;
}

type deleteConsultationByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  Record<string, never>
>;

export class DeleteConsultationByIdUseCase {
  constructor(
    private readonly consultationRepository: ConsultationRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute({
    consultationId,
  }: deleteConsultationByIdRequest): Promise<deleteConsultationByIdResponse> {
    const consultation = await this.consultationRepository.findById(consultationId);

    if (!consultation) {
      return left(new ResourceNotFound());
    }

    const patient = await this.patientRepository.findById(
      consultation.patientId.toString(),
    );

    if (!patient) {
      return left(new ResourceNotFound());
    }

    patient.medicalRecord.consultationsIds.remove(consultation.id);
    await this.consultationRepository.delete(consultation);
    return right({});
  }
}
