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
import { NestCreateCardiorespiratoryRecordUseCase } from '@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-create-record';
import { ReturnCardiorespiratoryPresenter } from '@/presentation/utils/presenters/return-cardiorespiratory-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { RecordAlreadyExists } from '@/application/common/error-handler/errors/record-already-exists';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('cardiorespiratory-record/patient-id/:patientId/clinician-id/:clinicianId')
export class CreateCardiorespiratoryRecordController {
  constructor(
    private createCardiorespiratoryRecord: NestCreateCardiorespiratoryRecordUseCase,
  ) {}

  @Post()
  @Roles('EMPLOYEE')
  @ApiBearerAuth()
  @ApiTags('Specific records - Cardiorespiratory Record')
  @ApiOperation({
    summary: 'Create a cardiorespiratory record',
    description: detailedDescription,
  })
  @ApiBody({ schema: swaggerBody })
  @ApiCreatedResponse({
    description: 'Cardiorespiratory record created',
    example: exampleResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('clinicianId') clinicianId: string,
    @Param('patientId') patientId: string,
  ) {
    const result = await this.createCardiorespiratoryRecord.execute({
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

    const { cardiorespiratoryRecord } = result.value;

    return {
      message: 'Cardiorespiratory record created successfully',
      record: ReturnCardiorespiratoryPresenter.toHTTP(cardiorespiratoryRecord),
    };
  }
}
