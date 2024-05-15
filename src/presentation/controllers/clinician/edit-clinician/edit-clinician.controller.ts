import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { NestEditClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-edit-clinician-by-id';
import { CreateClinicianPresenter } from '@/presentation/presenters/create-clinician-presenter';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

const editClinicianSchema = z.object({
  name: z.string(),
  surname: z.string(),
  gender: z.enum(['male', 'female', 'non-binary', 'other']),
  occupation: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(editClinicianSchema);
type EditClinicianSchema = z.infer<typeof editClinicianSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(editClinicianSchema);

@Controller('clinicians/:id')
export class EditClinicianController {
  constructor(private editClinician: NestEditClinicianUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Edit a clinician' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiOkResponse({ description: 'Clinician edited' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(bodyValidationPipe) body: EditClinicianSchema,
    @Param('id') id: string,
  ) {
    const { name, surname, gender, occupation, phoneNumber, email, password } = body;

    const result = await this.editClinician.execute({
      clinicianId: id,
      name,
      surname,
      gender,
      occupation,
      phoneNumber,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserAlreadyExists:
          throw new ConflictException(error.message);
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { clinician } = result.value;

    return {
      message: 'Clinician edited successfully',
      clinician: CreateClinicianPresenter.toHTTP(clinician, password),
    };
  }
}
