import { MedicalRecord } from '@entities/medical-record';
import { Either, left, right } from '@/application/common/error-handler/either';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';
import { PatientRepository } from '@/application/repositories/patient-repository';

interface editMedicalRecordByIdRequest {
  patientId: string;
  diagnosis: string;
  comorbidity: string;
}

type editMedicalRecordByIdResponse = Either<
  ResourceNotFound | NotAllowed,
  { medicalRecord: MedicalRecord }
>;

export class EditMedicalRecordByIdUseCase {
  constructor(private readonly repository: PatientRepository) {}

  async execute({
    patientId,
    diagnosis,
    comorbidity,
  }: editMedicalRecordByIdRequest): Promise<editMedicalRecordByIdResponse> {
    const patient = await this.repository.findById(patientId);

    if (!patient) {
      return left(new ResourceNotFound());
    }

    patient.medicalRecord.diagnosis = diagnosis;
    patient.medicalRecord.comorbidity = comorbidity;

    await this.repository.save(patient);
    return right({ medicalRecord: patient.medicalRecord });
  }
}
