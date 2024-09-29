import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
  exampleResponse,
  orderByBodyType,
  orderByValidationBody,
} from './fetch-patient-schema';
import { NestFetchPatientUseCase } from '@/infrastructure/adapter/patient/nest-fetch-patient-use-case';
import { ReturnPatientPresenter } from '@/presentation/utils/presenters/return-patient-presenter';

@Controller('/patients')
export class FetchPatientController {
  constructor(private fetchPatient: NestFetchPatientUseCase) {}

  @Get()
  @ApiTags('Patients')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: String,
    enum: [
      'name',
      'surname',
      'gender',
      'occupation',
      'slug',
      'email',
      'cpf',
      'birthDate',
      'phoneNumber',
      'password',
      'createdAt',
      'updatedAt',
    ],
  })
  @ApiQuery({ name: 'direction', required: false, type: String, enum: ['asc', 'desc'] })
  @ApiOperation({ summary: 'Fetch patients', description: detailedDescription })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Fetch patients', example: exampleResponse })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Query('page', PageValidationBody) page: typeof PageBodyType,
    @Query('orderBy', orderByValidationBody) field: typeof orderByBodyType,
    @Query('direction', directionValidationBody) direction: typeof directionBodyType,
  ) {
    const result = await this.fetchPatient.execute({
      page: page,
      orderBy: { field, direction },
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { patients } = result.value;

    return { patients: patients.map(ReturnPatientPresenter.toHTTP) };
  }
}
