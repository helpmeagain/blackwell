import { Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestDeleteClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-delete-clinician-by-id';

@Controller('clinicians/:id')
export class DeleteClinicianController {
  constructor(private deleteClinician: NestDeleteClinicianUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Delete clinician by id' })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Deleted clinician successfully' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string) {
    const result = await this.deleteClinician.execute({
      clinicianId: id,
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
