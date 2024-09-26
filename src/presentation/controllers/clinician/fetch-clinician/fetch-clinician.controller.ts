import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
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
} from './fetch-clinician-schema';
import { NestFetchClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-fetch-clinician-use-case';
import { ReturnClinicianPresenter } from '@/presentation/utils/presenters/return-clinician-presenter';

@Controller('/clinicians')
export class FetchClinicianController {
  constructor(private fetchClinician: NestFetchClinicianUseCase) {}

  @Get()
  @ApiTags('Clinicians')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'orderBy', required: false, type: String })
  @ApiQuery({ name: 'direction', required: false, type: String, enum: ['asc', 'desc'] })
  @ApiOperation({ summary: 'Fetch consultations' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Fetch consultations' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Query('page', PageValidationBody) page: typeof PageBodyType,
    @Query('orderBy', orderByValidationBody) field: typeof orderByBodyType,
    @Query('direction', directionValidationBody) direction: typeof directionBodyType,
  ) {
    const result = await this.fetchClinician.execute({
      page: page,
      orderBy: { field, direction },
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { clinicians } = result.value;

    return { clinicians: clinicians.map(ReturnClinicianPresenter.toHTTP) };
  }
}
