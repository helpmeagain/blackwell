import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { swaggerBody, BodyType, validationBody } from './create-clinician-schema';
import { NestCreateClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-create-clinician-use-case';
import { CreateClinicianPresenter } from '@/presentation/utils/presenters/create-clinician-presenter';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { Public } from '@/infrastructure/auth/public';

@Controller('clinicians')
export class CreateClinicianController {
  constructor(private createClinician: NestCreateClinicianUseCase) {}

  @Post()
  @Public()
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Create a clinician' })
  @ApiBody({ schema: swaggerBody })
  @ApiCreatedResponse({ description: 'Clinician created' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(@Body(validationBody) body: typeof BodyType) {
    const { name, surname, gender, occupation, phoneNumber, email, password } = body;

    const result = await this.createClinician.execute({
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
        default:
          throw new BadRequest(error.message);
      }
    }

    const { clinician } = result.value;

    return {
      message: 'Clinician created successfully',
      clinician: CreateClinicianPresenter.toHTTP(clinician, password),
    };
  }
}
