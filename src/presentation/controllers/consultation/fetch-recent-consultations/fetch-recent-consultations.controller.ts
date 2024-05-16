import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { NestFetchRecentConsultationUseCase } from '@/infrastructure/adapter/consultation/nest-fetch-recent-consultations-use-case';
import { z } from 'zod';
import { CreateConsultationPresenter } from '@/presentation/presenters/create-consultation-presenter';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/consultations')
export class FetchRecentConsultationsController {
  constructor(private fetchRecentConsultations: NestFetchRecentConsultationUseCase) {}

  @Get()
  @ApiTags('Consultations')
  @ApiOperation({ summary: 'Fetch consultations' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Fetch consultations' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentConsultations.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { consultations } = result.value;

    return { consultations: consultations.map(CreateConsultationPresenter.toHTTP) };
  }
}
