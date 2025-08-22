import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestGetUniversalMedicalRecordByIdUseCase } from '@/infrastructure/adapter/universal-medical-record/nest-get-universal-medical-record-by-id-use-case';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { ReturnUniversalMedicalRecordPresenter } from '@/presentation/utils/presenters/return-universal-medical-record-presenter';
import {
  detailedDescription,
  exampleResponse,
} from './get-universal-medical-record-by-id-schema';

@ApiExcludeController()
@Controller('universal-medical-record/:id')
export class GetUniversalMedicalRecordByIdController {
  constructor(
    private getUniversalMedicalRecordById: NestGetUniversalMedicalRecordByIdUseCase,
  ) {}

  @Get()
  @ApiTags('Universal Medical Record')
  @ApiOperation({
    summary: 'Get a universal medical record by id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return universal medical record by id',
    example: exampleResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  @ApiNotFoundResponse({ description: 'Universal medical record not found' })
  async handle(@Param('id') id: string) {
    const result = await this.getUniversalMedicalRecordById.execute({
      universalMedicalRecordId: id,
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

    const { universalMedicalRecord } = result.value;

    return {
      universalMedicalRecord:
        ReturnUniversalMedicalRecordPresenter.toHTTP(universalMedicalRecord),
    };
  }
}
