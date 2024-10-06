import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestGetConsultationByIdUseCase } from '@/infrastructure/adapter/consultation/nest-get-consultation-by-id-use-case';
import { CreateConsultationPresenter } from '@/presentation/utils/presenters/create-consultation-presenter';

@ApiExcludeController()
@Controller('consultations/:id')
export class GetByIdConsultationsController {
  constructor(private getByIdConsultations: NestGetConsultationByIdUseCase) {}

  @Get()
  @ApiTags('Consultations')
  @ApiOperation({ summary: 'Get a consultations by id' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return consultations by id' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string) {
    const result = await this.getByIdConsultations.execute({
      consultationId: id,
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

    const { consultation } = result.value;

    return { consultations: CreateConsultationPresenter.toHTTP(consultation) };
  }
}
