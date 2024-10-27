import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  PageBodyType,
  PageValidationBody,
  detailedDescription,
  directionBodyType,
  directionValidationBody,
  orderByBodyType,
  orderByValidationBody,
} from './fetch-records-by-clinician-id-schema';
import { NestFetchCardiorespiratoryIdsByClinicianIdUseCase } from '@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-fetch-records-ids-by-clinician-id-use-case';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('cardiorespiratory-record/fetch-ids-by-clinician-id/:clinicianId')
export class FetchCardiorespiratoryRecordController {
  constructor(private fetchRecords: NestFetchCardiorespiratoryIdsByClinicianIdUseCase) {}

  @Get()
  @Roles('EMPLOYEE')
  @ApiTags('Specific records - Cardiorespiratory Record')
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    enum: ['createdAt'],
  })
  @ApiQuery({ name: 'direction', required: false, type: String, enum: ['asc', 'desc'] })
  @ApiOperation({
    summary: 'Fetch cardiorespiratory record ids by clinician id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Fetch cardiorespiratory Record' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Param('clinicianId') clinicianId: string,
    @Query('page', PageValidationBody) page: typeof PageBodyType,
    @Query('orderBy', orderByValidationBody) field: typeof orderByBodyType,
    @Query('direction', directionValidationBody) direction: typeof directionBodyType,
  ) {
    const result = await this.fetchRecords.execute({
      clinicianId,
      page: page,
      orderBy: { field, direction },
    });

    if (result.isLeft()) {
      throw new InternalServerErrorException();
    }

    const { records } = result.value;

    return { records: records };
  }
}
