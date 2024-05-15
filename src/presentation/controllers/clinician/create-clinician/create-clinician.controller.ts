import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, ConflictException, Controller, Post, UsePipes } from '@nestjs/common';
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
import { CreateClinicianPresenter } from '@/presentation/presenters/create-clinician-presenter';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { Public } from '@/infrastructure/auth/public';

const createClinicianSchema = z.object({
  name: z.string(),
  surname: z.string(),
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
  @Public()
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
      const error = result.value;
      switch (error.constructor) {
        case UserAlreadyExists:
          throw new ConflictException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { clinician } = result.value;

    return {
      message: 'Clinician created successfully',
      clinician: CreateClinicianPresenter.toHTTP(clinician, password),
    };
  }
}
