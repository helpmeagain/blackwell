import { Either, left, right } from '@error/either';
import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { TraumaOrthopedicRecordRepository } from '@/application/repositories/trauma-orthopedic-record-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { editTraumaOrthopedicRecordRequest } from './edit-record-by-id-request';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

type editTraumaOrthopedicRecordResponse = Either<
  ResourceNotFound | UnauthorizedUser,
  { traumaorthopedicRecord: TraumaOrthopedicRecord }
>;

export class EditTraumaOrthopedicByIdUseCase {
  constructor(
    private readonly traumaorthopedicRecordRepository: TraumaOrthopedicRecordRepository,
  ) {}

  async execute(
    req: editTraumaOrthopedicRecordRequest,
  ): Promise<editTraumaOrthopedicRecordResponse> {
    const traumaorthopedicRecord = await this.traumaorthopedicRecordRepository.findById(
      req.id,
    );

    if (!traumaorthopedicRecord) {
      return left(new ResourceNotFound());
    }

    if (req.currentUserId !== traumaorthopedicRecord.clinicianId.toString()) {
      return left(new UnauthorizedUser());
    }

    traumaorthopedicRecord.medicalDiagnosis = req.medicalDiagnosis;
    traumaorthopedicRecord.anamnesis = req.anamnesis;
    traumaorthopedicRecord.physicalExamination = req.physicalExamination;
    traumaorthopedicRecord.triage = req.triage;
    traumaorthopedicRecord.palpation = req.palpation;
    traumaorthopedicRecord.edema = req.edema;
    traumaorthopedicRecord.pittingTest = req.pittingTest;
    traumaorthopedicRecord.fingerPressureTest = req.fingerPressureTest;
    traumaorthopedicRecord.perimetry = req.perimetry;
    traumaorthopedicRecord.subjectivePainAssessment = req.subjectivePainAssessment;
    traumaorthopedicRecord.specialOrthopedicTest = req.specialOrthopedicTest;
    
    await this.traumaorthopedicRecordRepository.save(traumaorthopedicRecord);
    return right({ traumaorthopedicRecord });
  }
}
