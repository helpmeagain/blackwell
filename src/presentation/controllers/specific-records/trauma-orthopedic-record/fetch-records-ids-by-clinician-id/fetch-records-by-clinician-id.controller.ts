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
import { NestFetchTraumaOrthopedicIdsByClinicianIdUseCase } from '@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-fetch-records-ids-by-clinician-id-use-case';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('trauma-orthopedic-record/fetch-ids-by-clinician-id/:clinicianId')
export class FetchTraumaOrthopedicRecordController {
  constructor(private fetchRecords: NestFetchTraumaOrthopedicIdsByClinicianIdUseCase) {}

  @Get()
  @Roles('EMPLOYEE')
  @ApiTags('Specific records - Trauma Orthopedic Record')
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    enum: ['createdAt'],
  })
  @ApiQuery({ name: 'direction', required: false, type: String, enum: ['asc', 'desc'] })
  @ApiOperation({
    summary: 'Fetch trauma orthopedic record ids by clinician id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Fetch trauma orthopedic Record' })
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
