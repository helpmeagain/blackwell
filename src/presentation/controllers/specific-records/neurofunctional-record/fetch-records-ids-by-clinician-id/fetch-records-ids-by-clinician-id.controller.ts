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
  directionBodyType,
  directionValidationBody,
  orderByBodyType,
  orderByValidationBody,
} from './fetch-records-ids-by-clinician-id-schema';
import { NestFetchNeurofunctionalIdsByClinicianIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-fetch-neurofunctional-ids-by-clinician-id-use-case';

@Controller('neurofunctional-record/fetch-ids-by-clinician-id/:clinicianId')
export class FetchNeurofunctionalRecordController {
  constructor(private fetchRecords: NestFetchNeurofunctionalIdsByClinicianIdUseCase) {}

  @Get()
  @ApiTags('Neurofunctional Record')
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    enum: ['createdAt'],
  })
  @ApiQuery({ name: 'direction', required: false, type: String, enum: ['asc', 'desc'] })
  @ApiOperation({ summary: 'Fetch neurofunctional record ids by clinician id' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Fetch neurofunctional Record' })
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
