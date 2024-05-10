import { Either, left, right } from '@error/either';
import { Patient } from '@entities/patient';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Gender } from '@/domain/common/types/gender-type';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { HashGenerator } from '@/application/cryptography/hash-generator';
import { MedicalRecord } from '@/domain/entities/medical-record';

interface createPatientRequest {
  name: string;
  surname: string;
  gender: Gender;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  password: string;
}

type createConsultationResponse = Either<UserAlreadyExists, { patient: Patient }>;

export class CreatePatientUseCase {
  constructor(
    private readonly repository: PatientRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(req: createPatientRequest): Promise<createConsultationResponse> {
    const { name, surname, gender, birthDate, phoneNumber, email, password } = req;

    const patientWithEmailAlreadyExists = await this.repository.findByEmail(email);

    if (patientWithEmailAlreadyExists) {
      return left(new UserAlreadyExists('email', email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const patient = Patient.create({
      name,
      surname,
      gender,
      birthDate,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    patient.medicalRecord = MedicalRecord.create({ patientId: patient.id });
    const patientWithSlugAlreadyExists = await this.repository.findBySlug(
      patient.slug.value,
    );
    if (patientWithSlugAlreadyExists) {
      patient.slug.value = patient.slug.value + Math.floor(Math.random() * 100);
    }

    await this.repository.create(patient);
    await this.repository.createRecord(patient.id.toString(), patient.medicalRecord);
    return right({ patient });
  }
}
