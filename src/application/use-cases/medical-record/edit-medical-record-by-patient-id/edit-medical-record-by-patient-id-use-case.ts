import { Either, left, right } from '@error/either';
import { ResourceNotFound } from '@error/errors/resource-not-found';
import { NotAllowed } from '@error/errors/not-allowed';
import { MedicalRecord } from '@entities/medical-record';
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

export class EditMedicalRecordByPatientIdUseCase {
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

    await this.repository.saveRecord(patient.medicalRecord);
    return right({ medicalRecord: patient.medicalRecord });
  }
}
