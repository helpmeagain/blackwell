import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
// import { ZodValidationPipe } from '@/presentation/utils/zod-validation-pipe';
import { NestFetchRecentConsultationUseCase } from '@/infrastructure/adapter/consultation/nest-fetch-recent-consultations-use-case';
// import { z } from 'zod';
import { CreateConsultationPresenter } from '@/presentation/utils/presenters/create-consultation-presenter';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BodyType, validationBody } from './fetch-recent-consultations-schema';

// const pageQueryParamSchema = z
//   .string()
//   .optional()
//   .default('1')
//   .transform(Number)
//   .pipe(z.number().min(1));

// const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
// type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/consultations')
export class FetchRecentConsultationsController {
  constructor(private fetchRecentConsultations: NestFetchRecentConsultationUseCase) {}

  @Get()
  @ApiTags('Consultations')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiOperation({ summary: 'Fetch consultations' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Fetch consultations' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Query('page', validationBody) page: typeof BodyType) {
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
