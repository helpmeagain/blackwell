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
import { BodyType, swaggerBody, validationBody } from './edit-clinician-schema';
import { NestEditClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-edit-clinician-by-id';
import { CreateClinicianPresenter } from '@/presentation/utils/presenters/create-clinician-presenter';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

@Controller('clinicians/:id')
export class EditClinicianController {
  constructor(private editClinician: NestEditClinicianUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Edit a clinician' })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({ description: 'Clinician edited' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(@Body(validationBody) body: typeof BodyType, @Param('id') id: string) {
    const { name, surname, gender, occupation, phoneNumber, email, password } = body;

    const result = await this.editClinician.execute({
      clinicianId: id,
      name,
      surname,
      gender,
      occupation,
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

    const { clinician } = result.value;

    return {
      message: 'Clinician edited successfully',
      clinician: CreateClinicianPresenter.toHTTP(clinician, password),
    };
  }
}
