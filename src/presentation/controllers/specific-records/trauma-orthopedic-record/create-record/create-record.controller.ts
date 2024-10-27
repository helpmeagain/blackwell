import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  swaggerBody,
  BodyType,
  validationBody,
  exampleResponse,
  detailedDescription,
} from './create-record-schema';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { NestCreateTraumaOrthopedicRecordUseCase } from '@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-create-record';
import { ReturnTraumaOrthopedicPresenter } from '@/presentation/utils/presenters/return-trauma-orthopedic-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { RecordAlreadyExists } from '@/application/common/error-handler/errors/record-already-exists';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('trauma-orthopedic-record/patient-id/:patientId/clinician-id/:clinicianId')
export class CreateTraumaOrthopedicRecordController {
  constructor(
    private createTraumaOrthopedicRecord: NestCreateTraumaOrthopedicRecordUseCase,
  ) {}

  @Post()
  @Roles('EMPLOYEE')
  @ApiBearerAuth()
  @ApiTags('Specific records - Trauma Orthopedic Record')
  @ApiOperation({
    summary: 'Create a trauma orthopedic record',
    description: detailedDescription,
  })
  @ApiBody({ schema: swaggerBody })
  @ApiCreatedResponse({
    description: 'Trauma Orthopedic record created',
    example: exampleResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('clinicianId') clinicianId: string,
    @Param('patientId') patientId: string,
  ) {
    const result = await this.createTraumaOrthopedicRecord.execute({
      patientId,
      clinicianId,
      ...body,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        case RecordAlreadyExists:
          throw new ConflictException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { traumaorthopedicRecord } = result.value;

    return {
      message: 'Trauma Orthopedic record created successfully',
      record: ReturnTraumaOrthopedicPresenter.toHTTP(traumaorthopedicRecord),
    };
  }
}
