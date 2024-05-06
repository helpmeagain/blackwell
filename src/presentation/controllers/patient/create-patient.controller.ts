import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, ConflictException, Controller, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { NestCreatePatientUseCase } from '@/infrastructure/adapter/patient/nest-create-patient-use-case';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { patientPresenter } from '@/presentation/presenters/patient-presenter';

const createPatientSchema = z.object({
  name: z.string(),
  surname: z.string(),
  gender: z.enum(['male', 'female', 'non-binary', 'other']),
  birthDate: z
    .string()
    .datetime()
    .refine(
      (value) => {
        const birthDate = new Date(value);
        const currentDate = new Date();
        return birthDate < currentDate;
      },
      { message: 'Birth date must be in the past' },
    ),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreatePatientSchema = z.infer<typeof createPatientSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(createPatientSchema);

@Controller('patients')
export class CreatePatientController {
  constructor(private createPatient: NestCreatePatientUseCase) {}

  @Post()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Create a patient' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiCreatedResponse({ description: 'Patient created' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  @UsePipes(new ZodValidationPipe(createPatientSchema))
  async handle(@Body() body: CreatePatientSchema) {
    const { name, surname, gender, birthDate, phoneNumber, email, password } = body;

    const result = await this.createPatient.execute({
      name,
      surname,
      gender,
      birthDate: new Date(birthDate),
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
      patient: patientPresenter.toHTTP(patient, password),
    };
  }
}
