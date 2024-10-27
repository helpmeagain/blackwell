import { Either, left, right } from '@error/either';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { CardiorespiratoryRecordRepository } from '@/application/repositories/cardiorespiratory-record-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { editCardiorespiratoryRecordRequest } from './edit-record-by-id-request';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

type editCardiorespiratoryRecordResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { cardiorespiratoryRecord: CardiorespiratoryRecord }
>;

export class EditCardiorespiratoryByIdUseCase {
  constructor(
    private readonly cardiorespiratoryRecordRepository: CardiorespiratoryRecordRepository,
  ) {}

  async execute(
    req: editCardiorespiratoryRecordRequest,
  ): Promise<editCardiorespiratoryRecordResponse> {
    const cardiorespiratoryRecord = await this.cardiorespiratoryRecordRepository.findById(
      req.id,
    );

    if (!cardiorespiratoryRecord) {
      return left(new ResourceNotFound());
    }

    if (req.currentUserId !== cardiorespiratoryRecord.clinicianId.toString()) {
      return left(new UnauthorizedUser());
    }

    cardiorespiratoryRecord.medicalDiagnosis = req.medicalDiagnosis;
    cardiorespiratoryRecord.anamnesis = req.anamnesis;
    cardiorespiratoryRecord.physicalExamination = req.physicalExamination;
    cardiorespiratoryRecord.triage = req.triage;
    cardiorespiratoryRecord.lifestyleHabits = req.lifestyleHabits;
    cardiorespiratoryRecord.vitalSigns = req.VitalSigns;
    cardiorespiratoryRecord.physicalInspection = req.physicalInspection;
    cardiorespiratoryRecord.pneumofunctionalAssessment = req.pneumofunctionalAssessment;
    cardiorespiratoryRecord.cardiofunctionalAssessment = req.cardiofunctionalAssessment;

    await this.cardiorespiratoryRecordRepository.save(cardiorespiratoryRecord);
    return right({ cardiorespiratoryRecord });
  }
}
