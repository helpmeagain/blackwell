import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Either, left, right } from '@application/common/error-handler/either';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';

interface deleteConsultationByIdRequest {
  consultationId: string;
  patientId: string;
  clinicianId: string;
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
    patientId,
    clinicianId,
  }: deleteConsultationByIdRequest): Promise<deleteConsultationByIdResponse> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    const consultation = await this.consultationRepository.findById(consultationId);

    if (!consultation) {
      return left(new ResourceNotFound());
    }

    if (clinicianId !== consultation.clinicianId.toString()) {
      return left(new NotAllowed());
    }

    patient.medicalRecord.consultationsIds.remove(consultation.id);
    await this.patientRepository.save(patient);
    await this.consultationRepository.delete(consultation);
    return right({});
  }
}
