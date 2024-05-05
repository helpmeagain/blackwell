import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { NestCreateClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-create-clinician-use-case';
import { clinicianPresenter } from '@/presentation/presenters/clinician-presenter';

const createClinicianSchema = z.object({
  name: z.string(),
  surname: z.string(),
  slug: z.string(),
  gender: z.enum(['male', 'female', 'non-binary', 'other']),
  occupation: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateClinicianSchema = z.infer<typeof createClinicianSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(createClinicianSchema);

@Controller('clinicians')
export class CreateClinicianController {
  constructor(private createClinician: NestCreateClinicianUseCase) {}

  @Post()
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Create a clinician' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiCreatedResponse({ description: 'Clinician created' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  @UsePipes(new ZodValidationPipe(createClinicianSchema))
  async handle(@Body() body: CreateClinicianSchema) {
    const { name, surname, gender, occupation, phoneNumber, email, password } = body;

    const result = await this.createClinician.execute({
      name,
      surname,
      gender,
      occupation,
      phoneNumber,
      email,
      password,
    });

    if (result.isLeft()) {
      throw new Error('Clinician not created');
    }

    return { clinician: clinicianPresenter.toHTTP(result.value.clinician) };
  }
}
