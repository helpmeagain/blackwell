import { Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestDeleteConsultationByIdUseCase } from '@/infrastructure/adapter/consultation/nest-delete-consultation-use-case';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

@Controller('consultations/:id')
export class DeleteConsultationController {
  constructor(private deleteByIdConsultations: NestDeleteConsultationByIdUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiTags('Consultations')
  @ApiOperation({ summary: 'Delete a consultations by id' })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Delete consultations successfully' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string) {
    const result = await this.deleteByIdConsultations.execute({
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
  }
}
