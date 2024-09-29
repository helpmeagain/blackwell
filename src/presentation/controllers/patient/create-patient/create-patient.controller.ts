import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  BodyType,
  detailedDescription,
  exampleResponse,
  swaggerBody,
  validationBody,
} from './create-patient-schema';
import { NestCreatePatientUseCase } from '@/infrastructure/adapter/patient/nest-create-patient-use-case';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { CreatePatientPresenter } from '@/presentation/utils/presenters/create-patient-presenter';
import { Public } from '@/infrastructure/auth/public';

@Controller('patients')
export class CreatePatientController {
  constructor(private createPatient: NestCreatePatientUseCase) {}

  @Post()
  @Public()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Create a patient', description: detailedDescription })
  @ApiBody({ schema: swaggerBody })
  @ApiCreatedResponse({ description: 'Patient created', example: exampleResponse })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(@Body(validationBody) body: typeof BodyType) {
    const { name, surname, gender, birthDate, cpf, phoneNumber, email, password } = body;

    const result = await this.createPatient.execute({
      name,
      surname,
      gender,
      birthDate: new Date(birthDate),
      cpf,
      phoneNumber,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserAlreadyExists:
          throw new ConflictException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { patient } = result.value;

    return {
      message: 'Patient created successfully',
      patient: CreatePatientPresenter.toHTTP(patient, password),
    };
  }
}
