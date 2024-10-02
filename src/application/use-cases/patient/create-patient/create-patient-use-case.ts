import { Either, left, right } from '@error/either';
import { Patient } from '@entities/patient';
import { PatientRepository } from '@/application/repositories/patient-repository';
import { Gender } from '@/domain/common/types/gender-type';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { HashGenerator } from '@/application/cryptography/hash-generator';
import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';
import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';

interface createPatientRequest {
  name: string;
  surname: string;
  gender: Gender;
  birthDate: Date;
  cpf: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  email: string;
  password: string;
}

type createConsultationResponse = Either<UserAlreadyExists, { patient: Patient }>;

export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly universalMedicalRecordRepository: UniversalMedicalRecordRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(req: createPatientRequest): Promise<createConsultationResponse> {
    const {
      name,
      surname,
      gender,
      cpf,
      birthDate,
      phoneNumber,
      address,
      city,
      state,
      email,
      password,
    } = req;

    const [patientWithEmailAlreadyExists, patientWithCpfAlreadyExists] =
      await Promise.all([
        this.patientRepository.findByEmail(email),
        this.patientRepository.findByCpf(cpf),
      ]);

    if (patientWithEmailAlreadyExists || patientWithCpfAlreadyExists) {
      const field = patientWithEmailAlreadyExists ? 'email' : 'CPF';
      const value = patientWithEmailAlreadyExists ? email : cpf;
      return left(new UserAlreadyExists(field, value));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const patient = Patient.create({
      name,
      surname,
      gender,
      cpf,
      birthDate,
      phoneNumber,
      address,
      city,
      state,
      email,
      password: hashedPassword,
    });

    patient.universalMedicalRecord = UniversalMedicalRecord.create({
      patientId: patient.id,
    });

    await this.universalMedicalRecordRepository.create(patient.universalMedicalRecord);
    await this.patientRepository.create(patient);
    return right({ patient });
  }
}
