import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { z } from 'zod';

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('consultations')
export class FetchRecentConsultationsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiBearerAuth()
  @ApiTags('Consultations')
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const perPage = 1;
    const result = await this.prisma.consultation.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { consultation: result };
  }
}
