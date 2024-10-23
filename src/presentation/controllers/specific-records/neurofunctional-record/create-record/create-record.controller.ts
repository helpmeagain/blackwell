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
import { NestCreateNeurofunctionalRecordUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-create-neurofunctional-record';
import { ReturnNeurofunctionalePresenter } from '@/presentation/utils/presenters/return-neurofunctional-record-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { RecordAlreadyExists } from '@/application/common/error-handler/errors/record-already-exists';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('neurofunctional-record/patient-id/:patientId/clinician-id/:clinicianId')
export class CreateNeurofunctionalRecordController {
  constructor(
    private createNeurofunctionalRecord: NestCreateNeurofunctionalRecordUseCase,
  ) {}

  @Post()
  @Roles('EMPLOYEE')
  @ApiBearerAuth()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Create a neurofunctional record',
    description: detailedDescription,
  })
  @ApiBody({ schema: swaggerBody })
  @ApiCreatedResponse({
    description: 'Neurofunctional record created',
    example: exampleResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('clinicianId') clinicianId: string,
    @Param('patientId') patientId: string,
  ) {
    const result = await this.createNeurofunctionalRecord.execute({
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

    const { neurofunctionalRecord } = result.value;

    return {
      message: 'Neurofunctional record created successfully',
      record: ReturnNeurofunctionalePresenter.toHTTP(neurofunctionalRecord),
    };
  }
}
