import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
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
import { BodyType, swaggerBody, validationBody } from './edit-patient-schema';
import { NestEditPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-edit-patient-by-id-use-case';
import { CreatePatientPresenter } from '@/presentation/utils/presenters/create-patient-presenter';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

@Controller('patients/:id')
export class EditPatientController {
  constructor(private editPatient: NestEditPatientByIdUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Edit a patient' })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({ description: 'Patient edited' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      name,
      surname,
      gender,
      birthDate,
      cpf,
      phoneNumber,
      address,
      state,
      city,
      email,
      password,
    } = body;

    const result = await this.editPatient.execute({
      patientId: id,
      currentUserId: user.sub,
      name,
      surname,
      gender,
      birthDate: new Date(birthDate),
      cpf,
      address,
      state,
      city,
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
        case UnauthorizedUser:
          throw new UnauthorizedException(error.message);
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
