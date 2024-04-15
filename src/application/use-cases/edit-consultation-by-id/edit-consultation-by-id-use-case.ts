import { Consultation } from '@entities/consultation';
import { type ConsultationRepository } from '@application/repositories/consultation-repository';
import { Either, left, right } from '@/application/common/error-handler/either';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';

interface editConsultationByIdRequest {
  consultationId: string;
  clinicianId: string;
  appointmentDate: Date;
  room: number;
}

type editConsultationByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { consultation: Consultation }
>;

export class EditConsultationByIdUseCase {
  constructor(private readonly repository: ConsultationRepository) {}

  async execute({
    consultationId,
    clinicianId,
    appointmentDate,
    room,
  }: editConsultationByIdRequest): Promise<editConsultationByIdResponse> {
    const consultation = await this.repository.findById(consultationId);

    if (!consultation) {
      return left(new ResourceNotFound());
    }

    if (clinicianId !== consultation.clinicianId.toString()) {
      return left(new NotAllowed());
    }

    consultation.appointmentDate = appointmentDate;
    consultation.room = room;
    await this.repository.save(consultation);
    
    return right({ consultation });
  }
}
