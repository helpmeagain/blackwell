import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestGetMedicalRecordByIdUseCase } from '@/infrastructure/adapter/medical-record/nest-get-medical-record-by-id-use-case';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { ReturnMedicalRecordPresenter } from '@/presentation/presenters/return-medical-record-presenter';

@Controller('medical-records/:id')
export class GetMedicalRecordByIdController {
  constructor(private getMedicalRecordById: NestGetMedicalRecordByIdUseCase) {}

  @Get()
  @ApiTags('Medical Record')
  @ApiOperation({ summary: 'Get a medical record by id' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return medical record by id' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string) {
    const result = await this.getMedicalRecordById.execute({
      medicalRecordId: id,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { medicalRecord } = result.value;

    return { medicalRecord: ReturnMedicalRecordPresenter.toHTTP(medicalRecord) };
  }
}
