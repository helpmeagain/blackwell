import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { NestEditPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-edit-patient-by-id-use-case';
import { CreatePatientPresenter } from '@/presentation/presenters/create-patient-presenter';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

const editPatientSchema = z.object({
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

const bodyValidationPipe = new ZodValidationPipe(editPatientSchema);
type EditPatientSchema = z.infer<typeof editPatientSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(editPatientSchema);

@Controller('patients/:id')
export class EditPatientController {
  constructor(private editPatient: NestEditPatientByIdUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Edit a patient' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiOkResponse({ description: 'Patient edited' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(bodyValidationPipe) body: EditPatientSchema,
    @Param('id') id: string,
  ) {
    const { name, surname, gender, birthDate, phoneNumber, email, password } = body;

    const result = await this.editPatient.execute({
      patientId: id,
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
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { patient } = result.value;

    return {
      message: 'Patient edited successfully',
      patient: CreatePatientPresenter.toHTTP(patient, password),
    };
  }
}
