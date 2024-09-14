import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestGetClinicianBySlugUseCase } from '@/infrastructure/adapter/clinician/nest-get-clinician-by-slug';
import { ReturnClinicianPresenter } from '@/presentation/utils/presenters/return-clinician-presenter';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

@Controller('clinicians/by-slug/:slug')
export class GetBySlugClinicianController {
  constructor(private getBySlugClinician: NestGetClinicianBySlugUseCase) {}

  @Get()
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Get a clinician by slug' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return clinician by slug' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('slug') slug: string) {
    const result = await this.getBySlugClinician.execute({
      slug,
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

    const { clinician } = result.value;

    return { clinician: ReturnClinicianPresenter.toHTTP(clinician) };
  }
}
